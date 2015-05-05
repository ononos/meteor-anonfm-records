var CACHED_STATS_DATA = ReactiveVar({});

function toHours (n) { return Math.round(n / 360 ) / 10;}
function toFixed2 (n) { return Math.round(n * 100 ) / 100;}
function toMb (n) { return toFixed2( n / ( 1024 * 1024 ) ).toLocaleString();}

function update_cache () {
  if (_.isEmpty(CACHED_STATS_DATA.get())) {
    Meteor.call('get-stats', function(err, data) {
      if (err) {
        Messages.error(err);
        return;
      }
      CACHED_STATS_DATA.set(data);
    });
  }
}

Template.stats.onRendered(function() {
  update_cache();

  // run next func when CACHED_STATS_DATA will be ready
  this.autorun(function() {
    if (!_.isEmpty(CACHED_STATS_DATA.get()))
      Meteor.defer(function() {
        draw_charts(CACHED_STATS_DATA.get());
      });
  });
});

Template.stats.helpers({
  isLoading: function() { return _.isEmpty(CACHED_STATS_DATA.get()); },
});

Template.sourceInfo.onCreated(function() {
    update_cache();
});

Template.sourceInfo.helpers({
  sources: function() {
    if (_.isEmpty(CACHED_STATS_DATA.get()))
        return [];

    var perSource = CACHED_STATS_DATA.get().perSource;
    console.log('perSource', perSource);
    perSource = _.filter(perSource, function(it) {
      return Sources.findOne(it._id, {reactive: false});
    });

    // return join perSource and Sources
    return _.map(perSource, function(it) {
      var source = Sources.findOne(it._id, {reactive: false});
      return {
        title: source.title,
        url: RegExp(/\w{28}/).test(source.url) ? 'https://docs.google.com/folderview?id=' + source.url
                                               : source.url,
        removed: source.rm,
        lastUpdated: source.lastUpdated,
        updateMsg: source.msg,
        updateInterval: source.update,
        count: Number(it.count).toLocaleString(),
        duration: Number(toHours(it.duration)).toLocaleString()
      };
    });
  }
});

/**
 * Draw charts
 * @param {{perDj, perWeekDay, perMonth, perSource}} data
 */
function draw_charts(data){

  var el_timeline = $('#time'),
      el_djstats = $('#djstats'),
      el_weekstats = $('#weekstats'),
      el_sourcestats = $('#sourcestats'),
      perDjData = data.perDj,
      perWeekDay = data.perWeekDay,
      perMonth = data.perMonth,
      perSource = data.perSource,
      totalRecordsCount = _.reduce(perDjData, function(memo, it) { return memo += it.count; }, 0),
      totalRecordsSize = _.reduce(perDjData, function(memo, it) { return memo += it.size; }, 0),
      totalRecordsDuration = toHours(_.reduce(perDjData, function(memo, it) { return memo += it.duration; }, 0));

  // show time line

  el_timeline.highcharts({
    title: {
      text: 'Записи помесячно',
    },
    subtitle: {
      text: 'Всего <b>' + totalRecordsCount + '</b> файлов, <b>' +
        toMb(totalRecordsSize) + ' Mb, </b> или <b>' + totalRecordsDuration + '</b> часов'
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: 'Часов'
        },
      },
      {
        min: 0,
        title: {
          text: 'Файлов'
        },
        opposite: true
      }
    ],
    series: [
      {
        yAxis: 0,
        name: 'Записи в часах',
        data: _.map(perMonth,
                    function(d) {
                      return [+new Date(d._id.y, d._id.m), Math.round(d.duration / 360 ) / 10];
                    })
      },
      {
        yAxis: 1,
        name: 'Файлы',
        data: _.map(perMonth,
                    function(d) {
                      return [+new Date(d._id.y, d._id.m), d.count];
                    })
      },
    ]
  });

  // show pie, per dj statiscics

  // Pie, dj stats, after 1 second
  Meteor.setTimeout(function() {

    var _update_weekstats = function() {
      // series of pie data.dj - is dj
      var djs = _.pluck(this.data, 'dj'),
          week_series_data =
            _.chain(djs)
            .map(function(dj, dj_index) {
              return _.chain(perWeekDay)
                .filter(function(w) {
                  return w._id.dj === dj; })
                .map(function(w) {
                  return [
                    dj_index,
                    w._id.day - 1, // mongo aggregate $dayOfWeek start from 1 day, we need 0
                    w.duration / 3600 // hours
                  ];
                })
                .value();
            })
            .flatten(1)
            .value(),

          avg = _.reduce(week_series_data, function(memo, data) { return memo + data[2]; }, 0
                        ) / (week_series_data.length === 0 ? 1 : week_series_data.length);

      // Create/update chart update week day statistic chart
      el_weekstats.highcharts({
        chart: {
          type: 'heatmap',
          marginTop: 40,
          marginBottom: 80
        },

        title: {
          text: 'Записи по дням недели'
        },

        xAxis: {
          categories: djs
        },

        yAxis: {
          categories: ['Понедельник', 'Вторник', 'Среда', 'Гей-Четверг', 'Пятница', 'Субкота', 'Воскресенье'],
          title: null
        },

        colorAxis: {
          min: 0,
          max: avg,
          minColor: '#FFFFFF',
          maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
        },

        tooltip: {
          formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> родил <br><b>' +
              (Math.round(this.point.value * 10) / 10) + '</b> часов<br>';
          }
        },

        series: [{
          name: 'Записи по диджеям',
          borderWidth: 1,
          data: week_series_data,
          dataLabels: {
            enabled: true,
            color: '#000000',
            format: '{point.value:.1f}'
          }
        }]
      });
    };                    // function _update_weekstats

    var calcPieData = function(arr, skip, len, total) {
      return {
        data: _.map(arr.slice(skip, skip + len), function(it) {
          return {
            dj: it._id,
            y: 100 * toHours(it.duration) / total,
            duration: toHours(it.duration),
            size: toMb(it.size),
            files: it.count
          };
        }),
        otherSize: toMb(_.reduce(arr.slice(skip + len), function(memo, it) { return memo += it.size; }, 0)),
        otherDuration: toHours(_.reduce(arr.slice(skip + len), function(memo, it) { return memo += it.duration; }, 0)),
        otherFiles: _.reduce(arr.slice(skip + len), function(memo, it) { return memo += it.count; }, 0)
      };
    },
        itemsPerPie = 15,
        pieData = calcPieData(perDjData, 0, itemsPerPie, totalRecordsDuration),
        pieRootData = pieData.data,
        otherDuration = pieData.otherDuration,
        otherSize = pieData.otherSize,
        otherFiles = pieData.otherFiles;

    pieRootData.push(
      { duration: otherDuration,
        files: otherFiles,
        size: otherSize,
        dj: 'Остальные',
        drilldown: 'other-0',
        y: 100 * otherDuration / totalRecordsDuration});

    var drilldowns = [];
    for (var i = itemsPerPie, j = perDjData.length, k = 0; i < j; i += itemsPerPie, k++) {
      var temp = calcPieData(perDjData, i, itemsPerPie, totalRecordsDuration),
          drillData = temp.data;

      drillData.push({
        duration: temp.otherDuration,
        files: temp.otherFiles,
        size: temp.otherSize,
        dj: 'Остальные',
        y: 100 * temp.otherDuration / totalRecordsDuration,
        drilldown: temp.otherDuration ? 'other-' + (k +1) : undefined
      });
      drilldowns.push({
        id: 'other-' + k,
        data: drillData
      });
    }                         // end drilldowns data calc

    el_djstats.highcharts({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Количество часов по диджеям'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.dj}: {point.y:.2f}%'
          },
          events: {
            // small delay
            afterAnimate: _update_weekstats
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">Записи</span><br/>',
        pointFormat: '<span style="color:{point.color}">{point.dj}</span> {point.duration}часов, <b>{point.y:.2f}%</b><br/> Всего {point.files} файлов в <b>{point.size}Mb</b>'
      },

      series: [{
        colorByPoint: true,
        data: pieRootData,
      }],
      drilldown: {
        series: drilldowns
      }
    }); // highcharts
  }, 1000);                     // pie chart

  // after 4 sec
  Meteor.setTimeout(function() {

    // filter removed source
    perSource = _.filter(perSource, function(it) {
      return Sources.findOne(it._id, {reactive: false});
    });

    el_sourcestats.highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Распределение записей по источникам',
      },
      xAxis: {
        categories: _.map(perSource, function(it) {
          var source = Sources.findOne(it._id, {reactive: false});
          return '<b>' + source.title + '</b> ' +  source.url; })
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: 'Часов'
          },
        },
        {
          min: 0,
          title: {
            text: 'Файлов'
          },
          opposite: true
        },
        {
          min: 0,
          title: {
            text: 'Размер'
          },
          opposite: true
        }
      ],
      series: [
        {
          yAxis: 0,
          name: 'Записи в часах',
          data: _.chain(perSource)
            .pluck('duration')
            .map(function(duration) { return toHours(duration); })
            .value()
        },
        {
          yAxis: 1,
          name: 'Файлы',
          data: _.pluck(perSource, 'count')
        },
        {
          yAxis: 2,
          name: 'Размер, Мб',
          data: _.chain(perSource)
            .pluck('size')
            .map(function(size) { return toFixed2(size / (1024 * 1024));})
            .value()
        },

      ]
    });
  }, 4000);

}
