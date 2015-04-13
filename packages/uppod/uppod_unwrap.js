var uppod_players;
var uppodstyle = '';

function Uppod(loadvars) {
    var _this = this;
    var canvasObjs = [];
    var vars;
    var brw;
    var ierr = '';
    var ipad = false;
    var android = false;
    var opera = false;
    var mobile = false;
    var nativecontrols = false;
    var ihtml5 = false;
    var init = false;
    var initevent = false;
    var iplay = false;
    var istart = false;
    var ifull = false;
    var irealfull = false;
    var ihide = false;
    var lastXY = 0;
    var lastdXY = 0;
    var ibuff = false;
    var iover = false;
    var istartevnt = false;
    var iline = false;
    var igo = false;
    var iwebkit = false;
    var firefox = false;
    var safari = false;
    var chrome = false;
    var nametip;
    var name_txt;
    var controls;
    var youtubeElemId;
    var youtubeIframe;
    var mouseMoveCatcher;
    var playlist;
    var pl_mc;
    var pl;
    var plwidth;
    var plheight;
    var ipl;
    var plbg;
    var pltext;
    var plplayed;
    var plrandom;
    var v;
    var vvv;
    var muted;
    var hideInterval;
    var rmenu;
    var timelength = 4;
    var timeitems = 0;
    var line_s;
    var volbarline_s;
    var lastTime = 0;
    var ltc = 0;
    var layer;
    var player;
    var uibg;
    var uibg_gl;
    var oo;
    var play_b;
    var pause_b;
    var back_b;
    var stop_b;
    var start_b;
    var time_play_b;
    var time_all_b;
    var volume_b;
    var volume_mute_b;
    var volbarline_b;
    var volbarline_all_b;
    var volbarline_play_b;
    var volbar_b;
    var volbars;
    var sep_b;
    var run_b;
    var run_pos;
    var runvolume_b;
    var runvolume_pos;
    var sep;
    var download_b;
    var next_b;
    var prev_b;
    var full_b;
    var full_back_b;
    var line_b;
    var line_all_b;
    var line_load_b;
    var line_play_b;
    var line_but_b;
    var space_b;
    var buffer_b;
    var menu_b;
    var playlist_b;
    var hd_b;
    var hdselect;
    var hd1_b;
    var sub_b;
    var sub_text;
    var sub_bg;
    var sub;
    var sub_lang = 0;
    var sub_showed = false;
    var sub_menu;
    var sub_menu2;
    var sub_menu_bg;
    var isub_menu_color;
    var isub_menu_bgcolor;
    var sub_last;
    var sub_lang_all = false;
    var mybuts = [];
    var cntrlength;
    var cntrl;
    var cntrls;
    var cntrli;
    var controls;
    var browser = new Uppod.Browser();
    var logo;
    var uppod = {
        _controls: null,
        _mediaW: null,
        _parentDom: null,
        _ads: null,
        iframe: {},
        window: {},
        document: {},
        toolTipOn: function(domElment) {
            domElment.onmouseover = function() {
                ToolTip(domElment, domElment.title)
            };
            domElment.onmouseout = function() {
                ToolTipHide(domElment)
            }
        },
        createMediaW: function() {
            this._mediaW = new Uppod.MediaW({
                mode: vars.m,
                ads: this.ads()
            });
            this._mediaW.onError.bind(function() {
                onReady();
                NotFound()
            });
            return this._mediaW
        },
        mediaW: function() {
            return this._mediaW
        },
        controls: function() {
            if (!this._controls) {
                this._controls = new Uppod.Controls()
            }
            return this._controls
        },
        playerBodyElement: function() {
            return body
        },
        parentDom: function() {
            return this._parentDom
        },
        ads: function() {
            if (!this._ads && Uppod.Ads) {
                this._ads = new Uppod.Ads({
                    containerDom: uppod.document.body,
                    playerDom: this.playerBodyElement().c,
                    prerollVast: vars.vast_preroll,
                    postrollVast: vars.vast_postroll,
                    pauserollVast: vars.vast_pauseroll,
                    midrollVast: vars.vast_midroll,
                    midrollTimes: vars.midroll_times,
                    adEachPlaylistItem: parseInt(vars.vast_pl) === 1,
                    pauseOnClick: parseInt(vars.vast_pauseonclick) === 1,
                    prerollPauseOnClick: parseInt(vars.vast_preroll_pauseonclick) === 1,
                })
            }
            return this._ads
        },
        vars: function() {
            return vars
        },
        toogleFullscreen: function() {
            return Full.apply(this, arguments)
        },
        isFullscreen: function() {
            return ifull
        },
    };
    if (loadvars.uid) {
        if (!uppod_players) {
            uppod_players = []
        }
        this.uid = loadvars.id = loadvars.uid
    };
    uppod_players.push(this);
    if (document.getElementById(loadvars.id)) {
        Init()
    } else {
        document.addEventListener('DOMContentLoaded', Init)
    };

    function createBody() {
        body = new Shaper2({
            w: vars.sw,
            h: vars.sh,
            bgc: vars.bodycolor,
            brd: vars.brd,
            brdc: vars.brdcolor,
            h0: (vars.cntrlout == 1 ? vars.sh - vars.cntrloutheight : 0) - (vars.pl && vars.plplace == "bottom" ? vars.plth + 20 : 0),
            a: (vars.transparent == 1 ? -1 : 1)
        });
        uppod.document.body.appendChild(body.c);
        CSS(uppod.iframe.contentDocument.body, {
            '-webkit-user-select': 'none',
            '-khtml-user-select': 'none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            'user-select': 'none',
            'overflow': 'hidden',
            'margin': '0px',
            'padding': '0px',
            'width': '100%',
            'height': '100%',
        });
        CSS(body.c, {
            'position': 'relative',
            'top': 0,
            'left': 0
        })
    };

    function createScreen() {
        scrn = new Shaper2({
            w: vars.scrn_w,
            h: vars.scrn_h,
            bgc: vars.screencolor,
            o: (vars.padding > 0 ? vars.o / 2 : 0),
            a: (vars.transparent == 1 ? -1 : 1)
        });
        body.c.appendChild(scrn.c);
        CSS(scrn.c, {
            'position': 'absolute',
            'top': vars.padding,
            'left': vars.padding,
            'zIndex': 1
        })
    };

    function createPlaylists() {
        if (vars.pl) {
            if (typeof(vars.pl) == 'object') {
                CreatePl()
            };
            if (typeof(vars.pl) == 'string') {
                var str;
                if (vars.pl.indexOf("{") == 0) {
                    str = vars.pl;
                    str = str.replace(/'/g, '"')
                } else {
                    str = LoadFile(vars.pl)
                };
                if (str) {
                    if (str.indexOf('#') == 0) {
                        str = un(str)
                    };
                    try {
                        if (str.indexOf("\'") > -1) {
                            str = str.replace(/\\'/g, "'")
                        };
                        vars.pl = JSON.parse(str);
                        vars.pl.playlist ? vars.pl = vars.pl.playlist : ''
                    } catch (err) {
                        Alert(vars.lang2.errjson_decode + ' ' + Filename(vars.pl), true)
                    }
                };
                CreatePl()
            };
            if (vars.file == '') {
                ipl = 0;
                if (vars.random == 1) {
                    ipl = getRandomInt(0, pl.length - 1);
                    Opacity(plbg[0], vars.plalpha);
                    Opacity(plbg[ipl], vars.plalpha_play)
                }
                if (vars.pl[ipl].playlist) {
                    if (vars.pl[ipl].playlist[0].playlist) {
                        UpdatedVarsFromPlaylist(vars.pl[ipl].playlist[0].playlist[0])
                    } else {
                        UpdatedVarsFromPlaylist(vars.pl[ipl].playlist[0])
                    }
                } else {
                    UpdatedVarsFromPlaylist(vars.pl[ipl])
                }
            }
        }
    };

    function createAlert() {
        alrt = document.createElement('div');
        alrt.className = 'uppod-alert';
        CSS(alrt, {
            'width': '100%',
            'position': 'absolute',
            'top': vars.padding,
            'left': vars.padding,
            'color': '#' + ReColor(vars.commentcolor),
            'zIndex': 3
        });
        body.c.appendChild(alrt);
        vars.commentbgcolor.indexOf('|') == -1 ? vars.commentbgcolor = vars.commentbgcolor + '|' + vars.commentbgcolor : '';
        alrt_bg = new Shaper2({
            w: vars.sw - vars.padding * 2,
            h: '20',
            o: 0,
            bgc: vars.commentbgcolor,
            bga1: vars.commentbgalpha1,
            bga2: vars.commentbgalpha2
        });
        alrt.appendChild(alrt_bg.c);
        alrt_txt = document.createElement('div');
        alrt.appendChild(alrt_txt);
        CSS(alrt_txt, {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            "paddingTop": (vars.commentmargin + vars.commenttopmargin),
            "paddingLeft": (vars.commentmargin + 5),
            "paddingBottom": (vars.commentmargin * 1.3),
            "fontFamily": vars.namefont,
            "fontSize": vars.namefontsize,
            "fontStyle": FontStyle(vars.namefontstyle),
            "fontWeight": FontWeight(vars.namefontstyle)
        });
        alrt_x = document.createElement('div');
        alrt.appendChild(alrt_x);
        CSS(alrt_x, {
            'position': 'absolute',
            'top': 0,
            'right': 0,
            "paddingTop": 5,
            "paddingRight": 10,
            "cursor": "pointer",
            "color": "#" + vars.commentcolor
        });
        alrt_x.innerHTML = 'x';
        alrt_x.onclick = CloseAlrt;
        alrt.style.display = 'none';
        disableSelection(alrt)
    }

    function createTip() {
        if (vars.tip == 1) {
            tip = uppod.document.createElement('div');
            tip.className = 'uppod-tip';
            uppod.document.body.appendChild(tip);
            CSS(tip, {
                'position': 'absolute',
                'top': 0,
                'left': 0,
                "visibility": "hidden",
                "color": "#" + ReColor(vars.tipfontcolor),
                "borderRadius": vars.tipbgo / 2,
                "fontFamily": vars.tipfont,
                "fontSize": vars.tipfontsize,
                "fontWeight": FontWeight(vars.namefontstyle),
                "padding": "4px",
                "lineHeight": "normal"
            });
            tip.style.zIndex = 9;
            CheckGradiendDiv(tip, vars.tipbgcolor)
        }
    }

    function createComment() {
        if (vars.comment != undefined && vars.comment != '' && vars.showname == 1) {
            if (vars.shownameliketip == 1) {
                CreateNameTip(vars.comment);
                vars.shownameonover == 1 && vars.shownameonstop == 0 ? Hide(nametip) : ''
            } else {
                Alert(vars.comment, false)
            }
        }
    };

    function createIframe(afterCreateCallback) {
        var _this = this;
        uppod.iframe = document.createElement('iframe');
        CSS(uppod.iframe, {
            'width': '100%',
            'height': '100%',
            'border': 'none'
        });
        uppod.iframe.onload = function() {
            uppod.window = uppod.iframe.contentWindow;
            uppod.document = uppod.iframe.contentDocument;
            if (afterCreateCallback) {
                afterCreateCallback.call(_this)
            }
        };
        vars.stg.appendChild(uppod.iframe)
    };

    function createMouseMoveCatcher() {
        mouseMoveCatcher = document.createElement('div');
        mouseMoveCatcher.className = 'uppod-mouse-move-catcher';
        CSS(mouseMoveCatcher, {
            display: 'none',
            'z-index': '103',
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
        });
        body.c.appendChild(mouseMoveCatcher)
    };

    function createPlayer() {
        createIframe(function() {
            createBody();
            ScreenSize();
            createScreen();
            createPlaylists();
            if (vars.file) {
                if (vars.file && vars.hd) {
                    QualityLinks()
                }
            };
            createAlert();
            createComment();
            createMouseMoveCatcher();
            Logo();
            Media();
            Controls();
            oRadius();
            Events();
            createTip();
            if (ierr != '') {
                Alert(ierr, true)
            }
            sizeInterval = setInterval(Sizing, 100)
        })
    }
    var _onReadyOnce = false;

    function onReady() {
        if (!_onReadyOnce && loadvars.onReady) {
            _onReadyOnce = true;
            setTimeout(function() {
                loadvars.onReady.call(_this, _this)
            }, 50)
        }
    }

    function initHtml5() {
        vars.stg.innerHTML = '';
        CSS(vars.stg, {
            'lineHeight': '1',
            'textAlign': 'left',
            'backgroundColor': (vars.transparent == 1 ? 'transparent' : '#' + ReColor(vars.bgcolor)),
            'text-align': 'left',
            '-moz-user-select': '-moz-none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            'user-select': 'none',
            'overflow': 'hidden'
        });
        createPlayer()
    }

    function initFlash() {
        var params = {
            allowFullScreen: "true",
            allowScriptAccess: "always"
        };
        loadvars.file.replace("|", "or");
        new swfobject.embedSWF(vars.nohtml5, vars.id, vars.sw, vars.sh, "10.0.0", false, loadvars, params);
        onReady()
    }

    function Init() {
        if (!loadvars.id) {
            return
        }
        Detect();
        vars = new Vars();
        vars.uid = loadvars.uid;
        vars.config.loader("lDlVQRVprL5krjtMQBVFPjNHxwIXPjAHlRt7lg1prL5krjtMQBVkfDSwlDh1vp4oxuIVOwvqTpAovjUwv2mEQqWoxw9VfeGCfwYoxu1kELNCOka1O1c0vptblw5pvp9SW2VVvGcMljAoxwHwTeG6xw50Q1c0vptblwYucBGCKgSClBYVEwvbvpmFQjUkleYMDB8HA3hwZL5qfet7r2VCQjAoxw0SfDSGL2AoxwtrOLSQx118KjAoxwt9Zu1Qlqmbx3hCQ24olet7vpm0rDEbzjhQlm19DgStOLl1Qpc0ZL9bfRt7vpm0rDEbE1IvrwHqKgSkOgU9T3roZLItfjaSPet7ZLxoZ1SkDet7vd1FPqEtvjIVx2AoQpm3zUEtl0m4vRYqDUIBEwStfjaCfwrvDjzqPRrqEwGHZ1SkDet9KDEtrnmwQBiFKeYqfnNofDH0fdxbvk09aet7vw50fUFqlRiHDRvCTuAYxg1FPkGoDRvwDRvCT2YoceipOgJ7lkIVPpv7lBHXfDH1zdz9xmSpDgHuOgzbTeVvE2CvEwG7au1XPp0brB51fdaCTuabrwYwPkGoDRrdDRvCfgSofdAYZg0FT2G8aw5qT2GXfwt7ceJ3OgcQZm07cw44PpAocwt9cRYwPkYCyuzbTR5tfdzCKD19KeGofgH0fnoCy3GofD1kzdWocB5Bzg14fDH0fdxbxB5NfUFqPpEvEwG+aRt7QwYCKD1kyuxbWe5bOgxbWq07EwF0aRF0aRFqKnIClqEVQLm8QLmGZLUuKjtpKnlVvqI2xDEuKj1tljtVKniVvpmbrN5Mljm8vDmtvqtglLItx3hMvGUHQnIClqEVQLmuKnc3lqItQnctKnIwlL1MrpmdZjtHlnI8Qjmbl3hoKjlMvqI8rptGlL98WDEwxDt8KniwQ3hMrntFlDICQp5tvGVAgAI8ZL5CrNlHxDcoKjhMx3mSlL50Kjl1Qpc0ZL9bKnhMrLcoKUmFvj9GKjIMl3IkxLIHKncHZLctKjcMQpcVrnI1QphtlptblLh8ZL5CrNV0QLF1Kjtorj1HcDIurjr8Qp9orj1HcDIVrLhCQ3ICQphtyN9pEw5uvjICrRYqKRvCPdJHy30CfWo=")
    }
    var body;
    var scrn;
    var alrt;
    var tip;

    function Comment() {
        if (vars.comment != undefined && vars.comment != '' && vars.showname == 1) {
            if (vars.shownameliketip == 1) {
                NameTip((vars.marquee == 1 ? '<marquee>' : '') + vars.comment + (vars.marquee == 1 ? '</marquee>' : ''))
            } else {
                Alert((vars.marquee == 1 ? '<marquee>' : '') + vars.comment + (vars.marquee == 1 ? '</marquee>' : ''), false)
            }
        } else {
            Hide(alrt)
        }
    }

    function Detect() {
        brw = navigator.userAgent.toLowerCase();
        if (brw.indexOf("ipad") > 0 || brw.indexOf("iphone") > 0) {
            ipad = true;
            mobile = true
        } else {
            if (brw.indexOf("webkit") > -1) {
                iwebkit = true
            }
            if (brw.indexOf("firefox") > -1) {
                firefox = true
            }
            if (brw.indexOf("android") > -1) {
                android = true;
                mobile = true
            }
            if (brw.indexOf("chrome") > -1) {
                chrome = true
            }
            if (brw.indexOf("opera") > -1) {
                opera = true
            }
        }
        if (navigator.vendor) {
            if (navigator.vendor.indexOf("Apple") > -1) {
                safari = true
            }
        }
        ihtml5 = !!document.createElement('canvas').getContext;
        ihtml5 ? ihtml5 = !!document.createElement('video').canPlayType : ''
    }

    function Alert(str, x) {
        if (alrt) {
            Show(alrt);
            alrt_txt.innerHTML = str;
            CSS(alrt_bg.canvas, {
                'height': alrt_txt.offsetHeight,
                'width': (vars.sw - vars.padding * 2)
            });
            if (x) {
                Show(alrt_x)
            } else {
                Hide(alrt_x)
            }
        } else {
            alert('Uppod HTML5: ' + str)
        }
    }

    function CloseAlrt() {
        Hide(alrt)
    }

    function CreateNameTip(str) {
        nametip = document.createElement('div');
        CSS(nametip, {
            'width': '100%',
            'position': 'absolute',
            'top': 5 + vars.namemargin_v + vars.padding,
            'left': 5 + vars.namemargin_h + vars.padding,
            'color': '#' + ReColor(vars.namecolor)
        });
        body.c.appendChild(nametip);
        name_txt = document.createElement('div');
        nametip.appendChild(name_txt);
        CSS(name_txt, {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'padding': vars.namepadding / 2 + 'px ' + vars.namepadding + 'px',
            "fontFamily": vars.namefont,
            "fontSize": vars.namefontsize + 'px',
            "fontStyle": FontStyle(vars.namefontstyle),
            "fontWeight": FontWeight(vars.namefontstyle),
            'zIndex': 2
        });
        name_txt.innerHTML = (vars.marquee == 1 ? '<marquee>' : '') + str + (vars.marquee == 1 ? '</marquee>' : '');
        var name_bg = new Shaper2({
            w: name_txt.offsetWidth,
            h: name_txt.offsetHeight,
            o: vars.namebgo / 2,
            bgc: vars.namebgcolor + '|' + vars.namebgcolor,
            bga1: vars.namebgalpha,
            bga2: vars.namebgalpha
        });
        nametip.appendChild(name_bg.c);
        CSS(name_bg.canvas, {
            'zIndex': 1
        })
    };

    function NameTip(str) {
        name_txt.innerHTML = str
    };

    function Logo(str) {
        if (vars.logo != '') {
            logo = document.createElement('img');
            logo.src = vars.logo;
            logo.onload = PositionLogo;
            body.c.appendChild(logo);
            Opacity(logo, vars.logoalpha);
            if (vars.logolink != '') {
                logo.onmouseover = function(e) {
                    Opacity(logo, 1)
                };
                logo.onmouseout = function(e) {
                    Opacity(logo, vars.logoalpha)
                };
                logo.onclick = function(e) {
                    window.open(vars.logolink, vars.logotarget)
                }
            };
            PositionLogo()
        }
    };

    function PositionLogo() {
        if (vars.logoplace == 1) {
            CSS(logo, {
                'position': 'absolute',
                'top': vars.logomargin_v,
                'left': vars.logomargin_h
            })
        }
        if (vars.logoplace == 2) {
            CSS(logo, {
                'position': 'absolute',
                'top': vars.logomargin_v,
                'right': vars.logomargin_h
            })
        }
        if (vars.logoplace == 3) {
            CSS(logo, {
                'position': 'absolute',
                'bottom': (vars.logomargin_v + (vars.cntrlout == 0 ? vars.cntrloutheight : 0)),
                'left': vars.logomargin_h
            })
        }
        if (vars.logoplace == 4) {
            CSS(logo, {
                'position': 'absolute',
                'bottom': (vars.logomargin_v + (vars.cntrlout == 0 ? vars.cntrloutheight : 0)),
                'right': vars.logomargin_h
            })
        }
    }

    function Events() {
        uppod.document.body.addEventListener("keydown", KeyHandler);

        function MouseMove(event) {
            if (ihide) {
                lastdXY = lastXY - (event.clientX + event.clientY);
                if (lastdXY != 0) {
                    CntrlShow();
                    if (vars.cntrlhide == 1 || (ifull && vars.fullcntrlhide == 1)) {
                        clearInterval(hideInterval);
                        hideInterval = setInterval(CntrlHide, 3000)
                    }
                }
            }
            lastXY = event.clientX + event.clientY
        };
        body.c.onmousemove = MouseMove;
        body.c.onmouseup = function MouseUp(e) {
            volbarline_b ? volbarline_s['active'] = false : '';
            line_b ? line_s['active'] = false : ''
        };
        body.c.onmouseover = function MouseOver(event) {
            iover = true;
            vars.shownameonover == 1 ? Show(nametip) : ''
        };
        body.c.onmouseout = function MouseOut(event) {
            iover = false;
            vars.shownameonover == 1 && ((vars.shownameonstop == 1 && iplay) || vars.shownameonstop == 0) ? Hide(nametip) : ''
        };
        var rightMenu = 'Uppod HTML5<br>0.5.19';
        if (rightMenu != 'native') {
            body.c.oncontextmenu = function ContextMenu(e) {
                if (!e) var e = window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
                if (rmenu) {
                    CSS(rmenu, {
                        "display": "block",
                        "position": "absolute",
                        "top": e.pageY,
                        "left": e.pageX
                    })
                } else {
                    rmenu = document.createElement('div');
                    rmenu.id = "rmenu";
                    uppod.document.body.appendChild(rmenu);
                    var rmenu1 = document.createElement('div');
                    rmenu.appendChild(rmenu1);
                    rmenu1.innerHTML = rightMenu;
                    CSS(rmenu, {
                        "borderRadius": "0px",
                        "cursor": "pointer",
                        "position": "absolute",
                        "top": e.pageY,
                        "left": e.pageX,
                        "backgroundColor": "#000",
                        "color": "#fff",
                        "borderStyle": "solid",
                        "borderColor": "#000000",
                        "borderWidth": "1px",
                        "padding": "2px 5px 3px 5px",
                        "font": "9px Tahoma",
                        "opacity": "1"
                    });
                    rmenu.style.zIndex = 999
                }
                setTimeout(function() {
                    uppod.document.getElementById("rmenu").style.display = "none"
                }, 1000);
                return false
            }
        }
        document.addEventListener("click", DocClick)
    }

    function DocClick(e) {
        if (rmenu) {
            Hide(rmenu)
        }
    }

    function KeyHandler(event) {
        var keyCode = event.which;
        if (keyCode == undefined) {
            keyCode = event.keyCode
        }
        if (ifull && keyCode == 27) {
            FullOff()
        }
        if (keyCode == 38) {
            if (media) {
                event.preventDefault();
                (media.volume + 0.1) < 1 ? media.volume += 0.1 : media.volume = 1
            }
        }
        if (keyCode == 40) {
            if (media) {
                event.preventDefault();
                (media.volume - 0.1) > 0 ? media.volume -= 0.1 : media.volume = 0
            }
        }
        if (keyCode == 39) {
            if (media && Duration() > 0) {
                var t = line_all_b.w / Duration();
                if (line_play_b.offsetWidth + t * vars.keyseek < line_all_b.w) {
                    Seek(line_play_b.offsetWidth + t * vars.keyseek)
                } else {
                    Seek(line_all_b.w)
                }
            }
        }
        if (keyCode == 37) {
            if (media && Duration() > 0) {
                var t = line_all_b.w / Duration();
                if (line_play_b.offsetWidth - t * vars.keyseek > 0) {
                    Seek(line_play_b.offsetWidth - t * vars.keyseek)
                } else {
                    Seek(0)
                }
            }
        }
        if (keyCode == 68) {
            Mute()
        }
        if (keyCode == 70) {
            !ifull ? Full() : FullOff()
        }
        if (vars.hotkey == 1 && keyCode == 32) {
            event.preventDefault();
            Toggle()
        }
    }

    function cMenu(t, i) {}
    var o11;
    var o12;
    var o21;
    var o22;
    var media_mc;
    var poster_mc;
    var media;
    var media_yt;
    var playInterval;

    function DestroyMedia() {
        if (media) {
            if (uppod.mediaW()) {
                uppod.mediaW().destroy()
            }
            if (playInterval) {
                clearInterval(playInterval);
                media.removeEventListener('play', OnPlay, false);
                media.removeEventListener('pause', OnPause, false);
                media.removeEventListener('canplay', onCanPlay, false);
                media.removeEventListener('volumechange', OnVolume, false)
            }
            or = [];
            ori = 0;
            if (isYoutube()) {
                media_yt.stopVideo();
                delete media_yt;
                var element = uppod.document.getElementById('yt_media_' + vars.uid);
                element.parentNode.removeChild(element);
                vars.youtube = false;
                vars.youtube_quality_received = false;
                !ifull && layer ? Show(layer) : ''
            } else {
                media.pause();
                media.src = '';
                media_mc.removeChild(media)
            }
            delete media;
            media = undefined;
            vars.events = new Array();
            if (line_b) {
                CSS(line_play_b, {
                    'width': '0'
                });
                CSS(line_load_b, {
                    'width': '0'
                })
            }
            igo = false;
            init = false;
            iplay = false;
            startX = 0
        }
    }

    function Media() {
        Uppod.trace('Media');
        DestroyMedia();
        vars.config.loader("lDlVQRVprL5krjtMQBVFPjNHxwIXPjAHlRt7lg1prL5krjtMQBVkfDSwlDh1vp4oxuIVOwvqTpAovjUwv2mEQqWoxw9VfeGCfwYoxu1kELNCOka1O1c0vptblw5pvp9SW2VVvGcMljAoxwHwTeG6xw50Q1c0vptblwYucBGCKgSClBYVEwvbvpmFQjUkleYMDB8HA3hwZL5qfet7r2VCQjAoxw0SfDSGL2AoxwtrOLSQx118KjAoxwt9Zu1Qlqmbx3hCQ24olet7vpm0rDEbzjhQlm19DgStOLl1Qpc0ZL9bfRt7vpm0rDEbE1IvrwHqKgSkOgU9T3roZLItfjaSPet7ZLxoZ1SkDet7vd1FPqEtvjIVx2AoQpm3zUEtl0m4vRYqDUIBEwStfjaCfwrvDjzqPRrqEwGHZ1SkDet9KDEtrnmwQBiFKeYqfnxofDH3fNAbrd09aet7vB5NfUFqlRiHDRvCTuWYTd1qPkGoDRvwDRvCT2AocRipOgJ7lkF4Ppz7lBHXfDH0zdz9TUSpDgHuOgzbTeVvE3mvEwG7au1IPqJbZw5sfdaCTuabQeYwPkGoDRrMDRvCfgStfdWYZg0FT2G8aw5BT2GXfwt7cRJ2OgcQZm07cB5VPpYocBt9cwYwPpNCyuzbxe5ofdzCKD19KeGofgH3fRN1fDH1OLvbWeVvE0EvEwG7WwY1PnSvE3CvEuCvE3VvEwIvE3tvEuCvE0VvEwIvE0tvEuoFPUFqhtFqTki9fgS3PpabQBY1fgH1Pqa9h30qPdW1PdW1PRr8KjtpvpUSlDISlLhCxDc8rpUwKj1tljtVD21kKj1tljtVKjtpKjtpvpUSlDc8vDmtvqtglLItx3hMvGUHQnIFxDEtQqhTQ2htKjItQpr0ZnI8KjlMvqI8lj9krL1tQqh8vpmSQ3ltW2VCQjh8KjcVQjI8v2ICx2m8KjcMQpcVrnIVvnitQphdZjtHlnIVrLhCQ3IFvp90Q3h5vjm8WDEwxDt8mDiFQ2h8Q25kQjtkZ3I0Q3mkZnI2ZLhtQ3IprL5krjtMQqIux3EbKnhwxL5uvjUwlL50KniMv2t0ZL9bKjEVx2Sqvp91QphdQ2IMvqIkvpmVrjmUQjmSlL50KjhCrqIdA1c8Qj9qKnlVvqc8rj9FKUhMl2rHlDIVxqcMQnm0lDIHlLl0Ew5uvjICrRYqKRvCPdJHy30CfWo=");
        if (vars.file.indexOf('youtube.com/') > -1 || vars.file.indexOf('youtu.be/') > -1) {
            vars.youtube_id = vars.file.split(/(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*)/)[3];
            if (vars.youtube_id.length == 11) {
                vars.youtube = true
            }
        }
        if (vars.youtube) {
            if (isYoutubeApiLoaded()) {
                YoutubeInit()
            } else {
                uppod.window.onYouTubeIframeAPIReady = function() {
                    YoutubeInit()
                };
                var youTubeScript = document.createElement('script');
                youTubeScript.src = "http://www.youtube.com/iframe_api";
                body.c.appendChild(youTubeScript)
            }
            vars.youtube_created = true
        } else {
            if (vars.youtube_created && hd_b) {
                vars.hd = '';
                vars.hda = vars.hd.split(',');
                vars.quality = null;
                HdSelect()
            }
            media = uppod.createMediaW().dom;
            media.addEventListener('canplay', onCanPlay);
            media.addEventListener('play', OnPlay);
            media.addEventListener('pause', OnPause);
            media.setAttribute("onplay", OnPlay);
            uppod.mediaW().onEnded.bind(OnEnded);
            media_mc.appendChild(media);
            CSS(media_mc, {
                'width': vars.sw - (!ifull ? vars.padding * 2 : 0) + 'px'
            });
            media.setAttribute('width', '100%');
            media.setAttribute('height', (!ifull ? vars.ph : vars.sh) - (!ifull ? vars.padding * 2 : 0) - (vars.cntrlout == 1 ? vars.cntrloutheight : 0) + 'px');
            media.setAttribute('x-webkit-airplay', 'allow');
            media.setAttribute('webkit-playsinline', '1');
            media.controls = false;
            CSS(media, {
                'position': 'absolute',
                'top': 0,
                'left': 0
            });
            if (vars.scale == "width") {
                CSS(media, {
                    'object-fit': 'cover'
                })
            }
            if (vars.scale == "stretch") {
                CSS(media, {
                    'object-fit': 'fill'
                })
            }
            if (vars.m == 'audio') {
                CSS(media, {
                    'width': '0px',
                    'height': '0px'
                })
            }
            if (browser.isOpera && vars.auto == "firstframe") {
                vars.auto = "none"
            }
            if (vars.auto == "none" || vars.radio == 1) {
                if (vars.radio == 1 && vars.radiodropcache == 1 && vars.file) {
                    if (vars.file.indexOf('?') > 0) {
                        vars.file = vars.file + '&' + getRandomInt(1, 100)
                    } else {
                        vars.file = vars.file + '?' + getRandomInt(1, 100)
                    }
                }
            } else {
                media.preload = 'auto'
            }
            if (vars.auto != 'none') {
                Source()
            }
            if (vars.auto == 'play') {
                uppod.mediaW().play()
            }
            setTimeout(checkStart, 100)
        }
        if (vars.screenposter != '') {
            vars.screenposter = CheckBase64(vars.screenposter);
            CSS(scrn.c, {
                'width': vars.sw,
                'height': vars.sh,
                'background': 'url(' + vars.screenposter + ') no-repeat center center',
                'background-size': 'cover'
            })
        }
        if (vars.poster != '') {
            function createPosterHtml() {
                if (vars.m == 'audio') {
                    return true
                }
                if (vars.fillposter == 1) {
                    return true
                }
                if (vars.youtube) {
                    if (browser.restrictMediaPlay == false) {
                        return true
                    }
                } else {
                    if (browser.hasMediaPosterShown == false) {
                        return true
                    }
                }
                return false
            }
            if (createPosterHtml()) {
                if (!poster_mc) {
                    poster_mc = document.createElement('div');
                    poster_mc.className = 'uppod-poster';
                    scrn.c.appendChild(poster_mc)
                }
                vars.poster = CheckBase64(vars.poster);
                CSS(poster_mc, {
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': vars.sw,
                    'height': vars.ph - vars.padding * 2 - (vars.cntrlout == 1 ? vars.cntrloutheight : 0),
                    'background': 'url(' + vars.poster + ') no-repeat center center',
                    'background-size': 'cover'
                })
            } else {
                if (media) {
                    media.setAttribute('poster', vars.poster)
                }
                ifull && playlist ? Resize() : ''
            }
        }
        if (vars.m == 'video' && mobile && media) {
            media.ontouchstart = ClickScreenMobile
        }
        if (!layer) {
            Layer();
            isYoutube() ? Hide(layer) : ''
        }
    }

    function ClickScreenMobile() {
        if (!nativecontrols) {
            var hide = vars.cntrlhide == 1 && vars.cntrlout == 0;
            var fullHide = ifull && vars.fullcntrlhide == 1;
            if (hide || fullHide) {
                CntrlShow();
                clearInterval(hideInterval);
                hideInterval = setInterval(CntrlHide, 3000)
            }
        }
    }

    function Layer() {
        if (!nativecontrols) {
            if (layer) {
                Remove('layer')
            }
            layer = document.createElement('div');
            layer.setAttribute('id', 'layer');
            body.c.appendChild(layer);
            CSS(layer, {
                'width': '100%',
                'height': '100%',
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'zIndex': 2
            });
            if (vars.m == 'video') {
                layer.onclick = Toggle
            }
            layer.style.zIndex = 2;
            alrt.style.zIndex = 3;
            nametip ? nametip.style.zIndex = 4 : '';
            controls ? controls.style.zIndex = 5 : '';
            logo ? logo.style.zIndex = 6 : ''
        }
    }

    function oRadius() {
        if (vars.o > 0) {
            oo = document.createElement('div');
            o11 = document.createElement('canvas');
            var ratio = 1;
            var ctx = o11.getContext("2d");
            if (ctx.webkitBackingStorePixelRatio < 2) {
                var ratio = window.devicePixelRatio || 1
            }
            o11.height = vars.o * ratio;
            o11.width = vars.o * ratio;
            ctx.fillStyle = '#' + ReColor(vars.bgcolor);
            ctx.beginPath();
            ctx.scale(ratio, ratio);
            ctx.moveTo(0, 0);
            ctx.lineTo(vars.o / 2, 0);
            ctx.quadraticCurveTo(0, 0, 0, vars.o / 2);
            ctx.closePath();
            ctx.fill();
            oo.appendChild(o11);
            o12 = document.createElement('canvas');
            var ctx = o12.getContext("2d");
            o12.height = vars.o * ratio;
            o12.width = vars.o * ratio;
            ctx.fillStyle = '#' + ReColor(vars.bgcolor);
            ctx.beginPath();
            ctx.scale(ratio, ratio);
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(vars.o / 2, 0, vars.o / 2, vars.o / 2);
            ctx.lineTo(vars.o / 2, 0);
            ctx.closePath();
            ctx.fill();
            oo.appendChild(o12);
            o22 = document.createElement('canvas');
            var ctx = o22.getContext("2d");
            o22.height = vars.o * ratio;
            o22.width = vars.o * ratio;
            ctx.fillStyle = '#' + ReColor(vars.bgcolor);
            ctx.beginPath();
            ctx.scale(ratio, ratio);
            ctx.moveTo(vars.o / 2, 0);
            ctx.quadraticCurveTo(vars.o / 2, vars.o / 2, 0, vars.o / 2);
            ctx.lineTo(vars.o / 2, vars.o / 2);
            ctx.closePath();
            ctx.fill();
            oo.appendChild(o22);
            o21 = document.createElement('canvas');
            var ctx = o21.getContext("2d");
            o21.height = vars.o * ratio;
            o21.width = vars.o * ratio;
            ctx.fillStyle = '#' + ReColor(vars.bgcolor);
            ctx.beginPath();
            ctx.scale(ratio, ratio);
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(0, vars.o / 2, vars.o / 2, vars.o / 2);
            ctx.lineTo(0, vars.o / 2);
            ctx.closePath();
            ctx.fill();
            oo.appendChild(o21);
            body.c.appendChild(oo);
            CSS(oo, {
                'z-index': 7,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'pointer-events': 'none',
                'height': 'auto',
                'overflow': 'hidden',
                'width': '100%',
                'height': '100%'
            });
            oo.style.zIndex = 7;
            oPos()
        }
    }

    function oPos() {
        CSS(o11, {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': vars.o + 'px',
            'height': vars.o + 'px'
        });
        CSS(o12, {
            'position': 'absolute',
            'top': 0,
            'left': Math.round(vars.sw - vars.o / 2),
            'width': vars.o + 'px',
            'height': vars.o + 'px'
        });
        CSS(o22, {
            'position': 'absolute',
            'top': Math.round(vars.sh - vars.o / 2),
            'left': Math.round(vars.sw - vars.o / 2),
            'width': vars.o + 'px',
            'height': vars.o + 'px'
        });
        CSS(o21, {
            'position': 'absolute',
            'top': Math.round(vars.sh - vars.o / 2),
            'left': 0,
            'width': vars.o + 'px',
            'height': vars.o + 'px'
        })
    }

    function Source() {
        if (vars.file != '') {
            if (vars.file.indexOf(' or ') > -1) {
                vars.or = vars.file.split(' or ');
                for (var i = 0; i < vars.or.length; i++) {
                    if (vars.or[i].indexOf(" and ") > -1) {
                        var _urls_and = vars.or[i].split(" and ");
                        vars.or[i] = _urls_and[getRandomInt(0, _urls_and.length - 1)]
                    }
                }
                vars.ori = 0;
                vars.file = vars.or[0]
            }
        }
        uppod.mediaW().setSources(vars.file)
    }

    function CreatePl() {
        playlist = document.createElement('div');
        playlist.className = 'uppod-playlist';
        pl_mc = document.createElement('div');
        playlist.appendChild(pl_mc);
        pl = new Array();
        plbg = new Array();
        pltext = new Array();
        plplayed = new Array();
        plrandom = new Array();
        var droprow = 0;
        for (i = 0; i < vars.pl.length; i++) {
            pl[i] = document.createElement('div');
            pl_mc.appendChild(pl[i]);
            CSS(pl[i], {
                'cursor': 'pointer',
                'color': '#' + ReColor(vars.plcolor),
                'width': vars.pltw,
                'height': vars.plth
            });
            if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
                CSS(pl[i], {
                    'position': 'absolute',
                    'top': (vars.plth * vars.pl_rows),
                    'left': (vars.pltw * i + vars.plmargin * i - vars.pltw * droprow)
                });
                if (vars.plrows > 0) {
                    if (i % vars.plrows == 0) {
                        vars.pl[i]['endrow'] = 1
                    }
                }
                if (vars.pl[i]['endrow'] == 1) {
                    vars.pl_rows++;
                    droprow = i + 1
                }
            }
            if (vars.plplace == 'bottomrow') {
                CSS(pl[i], {
                    'position': 'absolute',
                    'top': (vars.plth * i + vars.plmargin * i),
                    'left': 0,
                    'width': vars.sw - vars.plmargin * 2
                })
            }
            pl_mc.appendChild(pl[i]);
            plbg[i] = document.createElement('div');
            pl[i].appendChild(plbg[i]);
            CSS(plbg[i], {
                'height': vars.plth,
                'borderRadius': (vars.o > 0 ? 4 : 0)
            });
            Opacity(plbg[i], vars.plalpha);
            CheckGradiendDiv(plbg[i], vars.plbgcolor);
            if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
                CSS(plbg[i], {
                    'width': vars.pltw
                })
            }
            if (vars.plplace == 'botomrow') {
                CSS(plbg[i], {
                    'width': (vars.sw - vars.plmargin_h * 2)
                })
            }
            if (vars.pl[i]['poster'] && vars.pltumbs == 1) {
                plbg[i].innerHTML = "<img src='" + vars.pl[i]['poster'] + "' width='100%' id='plim" + i + "'>";
                Opacity(plbg[i], 1)
            }
            pltext[i] = document.createElement('div');
            pl[i].appendChild(pltext[i]);
            CSS(pltext[i], {
                'padding': 5,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'fontFamily': vars.plfont,
                'fontSize': vars.plfontsize
            });
            if (vars.plplace == 'botomrow') {
                CSS(pltext[i], {
                    'height': vars.plth
                })
            }
            if (vars.pl[i]['comment']) {
                pltext[i].innerHTML = vars.pl[i].comment
            } else {
                Hide(pltext[i])
            }
            if (vars.pl[i]['poster'] && vars.pltumbs == 1) {
                CheckGradiendDiv(pltext[i], vars.plbgcolor);
                CSS(plbg[i], {
                    'background': 'none'
                });
                i > 0 ? Hide(pltext[i]) : ''
            }
            pl[i].className = 'uppod-playlist-' + i;
            plbg[i].className = 'uppod-playlist-' + i + '_background';
            pltext[i].className = 'uppod-playlist-' + i + '_text';
            if (mobile) {
                pl[i].onclick = PlClick
            } else {
                pl[i].onmouseover = PlOver;
                pl[i].onmouseout = PlOut;
                pl[i].onclick = PlClick
            }
            plplayed[i] = false;
            plrandom[i] = i
        }
        if (mobile) {
            pl_mc.ontouchstart = PlTouchStart;
            pl_mc.ontouchmove = PlTouchMove;
            pl_mc.ontouchend = PlTouchEnd
        }
        body.c.appendChild(playlist);
        if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
            CSS(playlist, {
                'position': 'absolute',
                'width': (vars.sw - vars.plmargin_h * 2),
                'height': vars.plth * (vars.pl_rows + 1) + 10,
                'overflow': 'hidden'
            });
            vars.plplace == 'bottom' ? CSS(pl_mc, {
                'position': 'absolute',
                'top': 0,
                'left': 0
            }) : CSS(pl_mc, {
                'position': 'absolute',
                'top': 10,
                'left': 10
            });
            plwidth = (vars.pl.length - droprow) * vars.pltw + (vars.pl.length - droprow - 1) * vars.plmargin;
            plheight = vars.plth * (vars.pl_rows + 1) + 10
        }
        if (vars.plplace == 'bottomrow') {
            CSS(playlist, {
                'position': 'absolute',
                'width': (vars.sw - vars.plmargin_h * 2),
                'height': vars.bottomrowheight - vars.plmargin - vars.padding * 2,
                'overflow': 'hidden'
            });
            CSS(pl_mc, {
                'position': 'absolute',
                'top': 0,
                'left': 0
            });
            plwidth = vars.sw - vars.plmargin_h * 2;
            plheight = vars.pl.length * vars.plth + (vars.pl.length - 1) * vars.plmargin
        }
        ipl = 0;
        if (vars.plbgcolor_play != undefined) {
            CSS(plbg[ipl], {
                "background-color": '#' + vars.plbgcolor_play
            })
        }
        if (vars.plcolor_play != undefined) {
            CSS(pl[ipl], {
                "color": '#' + vars.plcolor_play
            })
        }
        Opacity(plbg[ipl], vars.plalpha_play);
        playlist.style.zIndex = 6;
        PlPlace();
        if (vars.plplace == "inside" && vars.pliview == 0) {
            ShowHide(playlist)
        }
    }

    function Pl() {
        if (playlist) {
            vars.plplace == 'inside' ? ShowHide(playlist) : ''
        } else {
            CreatePl()
        }
    }

    function RemovePl() {
        if (playlist) {
            playlist.removeChild(pl_mc);
            body.c.removeChild(playlist)
        }
    }

    function PlPlace() {
        if (vars.plplace == 'inside') {
            CSS(playlist, {
                'width': (vars.sw - vars.plmargin_h * 2)
            });
            CSS(playlist, {
                'top': ((ifull ? vars.sh : vars.stageheight) - vars.plth - vars.cntrloutheight - 10) - vars.plth * vars.pl_rows,
                'left': vars.plmargin_h
            });
            if (pl_mc.offsetLeft < -plwidth + playlist.offsetWidth) {
                CSS(pl_mc, {
                    'position': 'absolute',
                    'top': 10,
                    'left': (-plwidth + playlist.offsetWidth)
                })
            }
            if (plwidth <= (vars.sw - vars.plmargin_h * 2)) {
                CSS(pl_mc, {
                    'position': 'absolute',
                    'top': 10,
                    'left': 0
                })
            }
            if (ipl !== null) {}
        }
        if (!ifull) {
            if (vars.plplace == 'bottomrow') {
                CSS(playlist, {
                    'width': (vars.sw - vars.plmargin_h * 2)
                });
                CSS(playlist, {
                    'position': 'absolute',
                    'top': (vars.ph + (vars.cntrlout == 1 ? vars.cntrloutheight : 0) + 10 + vars.plmargin_v),
                    'left': vars.plmargin_h
                });
                if (ipl !== null) {
                    SlidePLs(ipl)
                }
            }
            if (vars.plplace == 'bottom') {
                CSS(playlist, {
                    'width': (vars.sw - vars.plmargin_h * 2)
                });
                CSS(playlist, {
                    'position': 'absolute',
                    'top': (vars.ph + 10),
                    'left': vars.plmargin_h
                });
                if (ipl !== null) {
                    SlidePLs(ipl)
                }
            }
        }
    }
    var touchStartX;
    var touchStartY;
    var touchLastX;
    var touchLastY;
    var ipltouch;

    function PlTouchStart(e) {
        touchLastX = touchStartX = e.targetTouches[0].pageX;
        touchLastY = touchStartY = e.targetTouches[0].pageY
    }

    function PlTouchMove(e) {
        var dx = e.targetTouches[0].pageX - touchLastX;
        var dy = e.targetTouches[0].pageY - touchLastY;
        touchLastX = e.targetTouches[0].pageX;
        touchLastY = e.targetTouches[0].pageY;
        if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
            var aim = pl_mc.offsetLeft + dx;
            if (aim < 0 && aim > (-plwidth + playlist.offsetWidth)) {
                CSS(pl_mc, {
                    'position': 'absolute',
                    'top': (vars.plplace == 'bottom' ? 0 : 10),
                    'left': aim
                })
            }
        }
        if (vars.plplace == 'bottomrow') {
            var aim = pl_mc.offsetTop + dy;
            if (aim < 0 && aim > -plheight + playlist.offsetHeight - 10) {
                CSS(pl_mc, {
                    'position': 'absolute',
                    'top': aim,
                    'left': 0
                })
            }
        }
        e.preventDefault()
    }

    function PlTouchStart1(e) {
        ipltouch = getPlaylistId(e.target)
    }

    function PlTouchEnd(e) {
        var dx = touchLastX - touchStartX;
        var dy = touchLastY - touchStartY;
        if (dx == 0 && dy == 0) {
            if (ipltouch !== null && ipltouch !== undefined) {
                PlClick0();
                ipl = ipltouch;
                PlClickCont();
                ipltouch = null
            }
        } else {
            PlTouchGo(dx, dy)
        }
    }

    function getPlaylistId(dom) {
        return dom.className.replace('uppod-playlist-', '').split('_')[0]
    }

    function PlTouchGo(dx, dy) {
        if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
            var aim = pl_mc.offsetLeft + dx;
            aim > 0 ? aim = 0 : '';
            aim < -plwidth + playlist.offsetWidth ? aim = -plwidth + playlist.offsetWidth : '';
            clearInterval(plInterval);
            plaim = aim;
            plInterval = setInterval(SlidePLProcess, 20)
        }
        if (vars.plplace == 'bottomrow') {
            var aim = pl_mc.offsetTop + dy;
            aim > 0 ? aim = 0 : '';
            aim < -plheight + playlist.offsetHeight - 10 ? aim = -plheight + playlist.offsetHeight - 10 : '';
            clearInterval(plInterval);
            plaim = aim;
            plInterval = setInterval(SlidePLProcess, 20)
        }
    }

    function PlOver(e) {
        var plid = getPlaylistId(e.target);
        Opacity(plbg[plid], 1);
        SlidePLs(plid);
        if (vars.pl[plid]['poster'] && vars.pl[plid]['comment']) {
            Show(pltext[plid])
        }
    }

    function PlOut(e) {
        var plid = getPlaylistId(e.target);
        if (vars.pl[plid]['poster'] && vars.pltumbs == 1) {
            if (ipl != plid) {
                Hide(pltext[plid]);
                Opacity(plbg[plid], (plplayed[plid] ? 0.5 : 1))
            }
        } else {
            if (ipl != plid) {
                Opacity(plbg[plid], (plplayed[plid] ? vars.plalpha2 : vars.plalpha))
            } else {
                Opacity(plbg[plid], vars.plalpha_play)
            }
        }
    }

    function PlClick(e) {
        if (ipl !== null && ipl !== undefined) {
            PlClick0()
        }
        ipl = getPlaylistId(e.target);
        PlClickCont()
    }

    function PlClickCont() {
        if (vars.pl[ipl].playlist) {
            PlClick1()
        } else {
            PlClick1();
            vars.plplace == "inside" ? Hide(playlist) : '';
            if (!iplay) {
                istart = true;
                Toggle()
            }
        }
        CheckPrevNext()
    }

    function Next() {
        if (ipl < (pl.length - 1)) {
            PlNext()
        }
    }

    function PlNext() {
        if (vars.random == 1) {
            if (plrandom.length > 1) {
                if (ipl !== null) {
                    PlClick0()
                }
                ipl = plrandom[getRandomInt(0, plrandom.length - 1)];
                PlClick1();
                Event('next')
            } else {
                EndPl();
                prev_b ? CSS(prev_b.c, {
                    'opacity': 1,
                    'filter': 'alpha(opacity=100)',
                    'cursor': 'pointer'
                }) : ''
            }
        } else {
            if (ipl < (pl.length - 1)) {
                if (ipl !== null) {
                    PlClick0()
                }
                ipl++;
                PlClick1();
                Event('next')
            } else {
                EndPl()
            }
        }
        CheckPrevNext();
        !iplay ? OnPlay() : ''
    }

    function CheckPrevNext() {
        if (vars.random == 0) {
            if (ipl == 0) {
                prev_b ? CSS(prev_b.c, {
                    'opacity': 0.3,
                    'filter': 'alpha(opacity=30)',
                    'cursor': 'default'
                }) : ''
            } else {
                prev_b ? CSS(prev_b.c, {
                    'opacity': 1,
                    'filter': 'alpha(opacity=100)',
                    'cursor': 'pointer'
                }) : ''
            }
            if (ipl == pl.length - 1) {
                next_b ? CSS(next_b.c, {
                    'opacity': 0.3,
                    'filter': 'alpha(opacity=30)',
                    'cursor': 'default'
                }) : ''
            } else {
                next_b ? CSS(next_b.c, {
                    'opacity': 1,
                    'filter': 'alpha(opacity=100)',
                    'cursor': 'pointer'
                }) : ''
            }
        }
    }

    function Prev() {
        PlPrev()
    }

    function PlPrev() {
        if (vars.random == 1) {
            if (plrandom.length > 1) {
                if (ipl !== null) {
                    PlClick0()
                }
                ipl = plrandom[getRandomInt(0, plrandom.length - 1)];
                PlClick1();
                Event('prev')
            } else {
                EndPl()
            }
        } else {
            if (ipl > 0) {
                if (ipl !== null) {
                    PlClick0()
                }
                ipl--;
                PlClick1();
                Event('prev');
                ipl == 0 && prev_b ? CSS(prev_b.c, {
                    'opacity': 0.3,
                    'filter': 'alpha(opacity=30)',
                    'cursor': 'default'
                }) : ''
            } else {}
        }
        CheckPrevNext()
    }

    function EndPl() {
        if (vars.plplay1 == 1) {
            TheEnd()
        } else {
            if (vars.random == 1) {
                for (p = 0; p < pl.length; p++) {
                    plrandom[p] = p
                }
                PlNext()
            } else {
                PlClick0();
                ipl = 0;
                PlClick1();
                Event('next')
            }
        }
    }

    function PlClick0() {
        if (vars.pl[ipl]['poster'] && vars.pltumbs == 1) {
            Hide(pltext[ipl]);
            Opacity(plbg[ipl], 0.5)
        } else {
            if (vars.plbgcolor_play != undefined) {
                CSS(plbg[ipl], {
                    "background-color": '#' + vars.plbgcolor
                })
            }
            if (vars.plcolor_play != undefined) {
                CSS(pl[ipl], {
                    "color": '#' + vars.plcolor
                })
            }
            Opacity(plbg[ipl], vars.plalpha2)
        }
        plplayed[ipl] = true;
        var idx = plrandom.indexOf(ipl);
        if (idx != -1) plrandom.splice(idx, 1)
    }

    function PlClick1() {
        if (vars.pl[ipl].playlist) {
            if (vars.pl[ipl].playlist != "back") {
                vars.pl_history.push(vars.pl);
                var newpl = vars.pl[ipl].playlist;
                vars.pl = [{
                    "comment": "←",
                    "playlist": "back"
                }];
                vars.pl = vars.pl.concat(newpl)
            } else {
                vars.pl = vars.pl_history[vars.pl_history.length - 1];
                vars.pl_history.splice(vars.pl_history.length - 1, 1)
            }
            RemovePl();
            CreatePl();
            vars.plplace == "inside" ? Show(playlist) : ''
        } else {
            ClearOldVars();
            UpdatedVarsFromPlaylist(vars.pl[ipl]);
            QualityLinks();
            if (uppod.ads()) {
                uppod.ads().newPlaylistItem()
            }
            NewFile(vars.file, true);
            if (vars.plbgcolor_play != undefined) {
                CSS(plbg[ipl], {
                    "background-color": '#' + vars.plbgcolor_play
                })
            }
            if (vars.plcolor_play != undefined) {
                CSS(pl[ipl], {
                    "color": '#' + vars.plcolor_play
                })
            }
            Opacity(plbg[ipl], vars.plalpha_play)
        }
    }

    function UpdatedVarsFromPlaylist(obj) {
        for (var key in obj) {
            if (obj[key].indexOf('#') == 0) {
                obj[key] = un(obj[key])
            }
            if (key == 'poster' && vars['poster'] == undefined) {
                vars['poster'] = obj['poster']
            } else {
                vars[key] = obj[key]
            }
            if (key == 'bigposter') {
                vars['poster'] = obj['bigposter']
            }
        }
    }

    function SlidePLs(plid) {
        if (vars.plplace == "inside" || vars.plplace == "bottom") {
            if (plwidth > (vars.sw - vars.plmargin_h * 2)) {
                SlidePL(plid)
            }
        }
        if (vars.plplace == "bottomrow") {
            if (plheight > vars.bottomrowheight) {
                SlidePL(plid)
            }
        }
    }
    var plInterval;
    var plaim;

    function SlidePL(i) {
        clearInterval(plInterval);
        if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
            var aim = -pl[i].offsetLeft + playlist.offsetWidth / 2 - vars.pltw / 2;
            if (aim > 0 || plwidth < vars.sw) {
                aim = 10
            }
            if (aim < 0 && aim < -plwidth + playlist.offsetWidth - 10) {
                aim = -plwidth + playlist.offsetWidth - 10
            }
            plaim = aim;
            plInterval = setInterval(SlidePLProcess, 20)
        }
        if (vars.plplace == 'bottomrow') {
            var aim = -pl[i].offsetTop + playlist.offsetHeight / 2 - vars.plth / 2;
            if (aim > 0) {
                aim = 10
            }
            if (aim < -plheight + playlist.offsetHeight - 10) {
                aim = -plheight + playlist.offsetHeight - 10
            }
            plaim = aim;
            plInterval = setInterval(SlidePLProcess, 20)
        }
    }

    function SlidePLProcess() {
        var aim = plaim;
        if (vars.plplace == 'inside' || vars.plplace == 'bottom') {
            if (Math.abs((pl_mc.offsetLeft - aim) / 10) <= 1) {
                clearInterval(plInterval)
            } else {
                CSS(pl_mc, {
                    'position': 'absolute',
                    'top': (vars.plplace == 'bottom' ? 0 : 10),
                    'left': pl_mc.offsetLeft - (pl_mc.offsetLeft - aim) / 10
                })
            }
        }
        if (vars.plplace == 'bottomrow') {
            if (Math.abs((pl_mc.offsetTop - aim) / 10) <= 1) {
                clearInterval(plInterval)
            } else {
                CSS(pl_mc, {
                    'position': 'absolute',
                    'top': pl_mc.offsetTop - (pl_mc.offsetTop - aim) / 10,
                    'left': 0
                })
            }
        }
    }

    function ClearOldVars() {
        if (sub) {
            KillSub();
            sub = null
        }
    }

    function NewFile(s, autoplay) {
        Uppod.trace('NewFile s=' + s + ' autoplay=' + autoplay);
        iplay = false;
        istartevnt = false;
        vars.file = s;
        if (autoplay) {
            vars.auto = 'play'
        }
        Media();
        Comment();
        if (autoplay) {
            OnPlay()
        }
    }

    function checkStart() {
        if (media) {
            if (Uppod.browser.doSendCanPlay == false || !vars.file || vars.file == '' || vars.auto != 'play') {
                onReady()
            }
            if (media.networkState > 0 || vars.youtube) {
                init = true;
                CSS(media, {
                    'opacity': 1,
                    'filter': 'alpha(opacity=100)'
                });
                Opacity(media, 1);
                playInterval = setInterval(Playing, 100);
                media.addEventListener('pause', OnPause, false);
                media.addEventListener('seeking', OnSeeking, false);
                media.addEventListener('seeked', OnSeeked, false);
                media.addEventListener('volumechange', OnVolume, false);

                function isFullscreen() {
                    if (document.fullscreen) {
                        document.fullscreen
                    } else if (document.webkitIsFullScreen) {
                        document.webkitIsFullScreen
                    } else if (document.mozFullScreen) {
                        document.mozFullScreen
                    }
                }

                function FullscreenChange() {}
                document.addEventListener("fullscreenchange", function() {
                    !document.fullscreen && ifull && !opera ? FullOff() : '';
                    FullscreenChange()
                }, false);
                document.addEventListener("mozfullscreenchange", function() {
                    !document.mozFullScreen && ifull ? FullOff() : '';
                    FullscreenChange()
                }, false);
                document.addEventListener("webkitfullscreenchange", function() {
                    !document.webkitIsFullScreen && ifull ? FullOff() : '';
                    FullscreenChange()
                }, false);
                document.addEventListener("MSFullscreenChange", function() {
                    (document.fullscreenElement != undefined) && ifull ? FullOff() : '';
                    FullscreenChange()
                }, false);
                muted || v == 0 ? Volume(0) : (v > 0 ? Volume(-v) : '');
                if (!initevent) {
                    Event("init");
                    initevent = true
                }
            } else {
                setTimeout(checkStart, 100)
            }
        }
    }

    function Play() {
        iplay = false;
        Toggle()
    }

    function Pause() {
        iplay = true;
        Toggle()
    }

    function Toggle(e) {
        var stop = false;
        if (uppod.ads()) {
            uppod.ads().isActive() ? stop = true : ''
        }
        if (!stop) {
            Uppod.trace("Toggle e=" + e);
            if (vars.auto == 'none' && !vars.youtube) {
                media.autoplay = true;
                Source();
                istart = true
            }
            vars.auto = 'play';
            if (!vars.file || vars.file == '') {
                Event('player_error', 'nofile')
            }
            istart = true;
            if (!iplay) {
                if (isYoutube()) {
                    media_yt.playVideo();
                    OnPlay()
                } else {
                    uppod.mediaW().play()
                }
            } else {
                if (isYoutube()) {
                    media_yt.pauseVideo();
                    OnPause()
                } else {
                    uppod.mediaW().pause()
                }
            }
        }
    }

    function Mybut(m) {
        if (mybuts[m.substr(11)]) {
            var act = mybuts[m.substr(11)].s.link;
            if (act.indexOf('http') == 0) {
                Link(act, (mybuts[m.substr(11)].s.target ? mybuts[m.substr(11)].s.target : "_blank"))
            } else {
                if (act == 'toggle') {
                    Toggle()
                }
            }
            Event('mybut', act)
        }
    }

    function Link(l, t) {
        if (l) {
            l = l.replace('(referer)', encodeURIComponent(vars.referer));
            l = l.replace('(link)', encodeURIComponent(vars.link));
            l = l.replace('(file)', encodeURIComponent(vars.file));
            l = l.replace('(redirect)', encodeURIComponent(vars.redirect));
            l = l.replace('(comment)', encodeURIComponent(vars.comment));
            l = l.replace('(time)', CurrentTime());
            if (l.substr(0, 3) == 'js:') {
                var myjsa = l.substr(3).split(',');
                eval(myjsa[0] + '(' + (myjsa.length > 1 ? myjsa[1] : '') + (myjsa.length > 2 ? ',' + myjsa[2] : '') + (myjsa.length > 3 ? ',' + myjsa[3] : '') + ');')
            }
            if (l.indexOf('http://') == 0) {
                window.open(l, t)
            }
        }
    }

    function Stop() {
        Uppod.trace('Stop');
        if (iplay) {
            Toggle();
            OnPause()
        }
        vars.radio == 0 ? Seek(0) : '';
        time_play_b ? time_play_b.c.innerHTML = formatTime(0) : '';
        vars.auto = 'none';
        if (isYoutube()) {
            media_yt.stopVideo()
        }
        Media();
        Event('stop');
        line_b && run_b ? RunPos(run_b, line_b, line_play_b, line_all_b, run_pos) : '';
        sub ? StopSub() : ''
    }

    function Download() {
        iplay ? Toggle() : '';
        var downloadUrl = vars.download != 1 && vars.download != '' ? vars.download : (uppod.mediaW() ? uppod.mediaW().sources[0] : (vars.file.indexOf("|") > 0 ? vars.file.substr(0, vars.file.indexOf("|")) : vars.file));
        window.open(downloadUrl, "_blank");
        Event('download')
    }

    function Quality() {
        if (hd_b) {
            if (vars.filehd) {
                vars.start = media.currentTime;
                var fileold = vars.file;
                NewFile(vars.filehd, true);
                vars.filehd = fileold;
                if (hd1_b.c.style.display == 'none') {
                    Hide(hd_b.c);
                    Show(hd1_b.c);
                    Event('quality', '1')
                } else {
                    Hide(hd1_b.c);
                    Show(hd_b.c);
                    Event('quality', '0')
                }
            }
        }
    }

    function QualityLinks() {
        if (vars.youtube) {} else {
            if (vars.hd && vars.file) {
                if (vars.hd.indexOf('::') > 0) {
                    vars.filehd = vars.file.replace(vars.hd.split('::')[0], vars.hd.split('::')[1]);
                    var change = false;
                    if (hd1_b) {
                        if (hd1_b.c.style.display == 'block') {
                            change = true
                        }
                    } else {
                        if (vars.hd1 == 1) {
                            change = true
                        }
                    }
                    if (change) {
                        var fileold = vars.file;
                        vars.file = vars.filehd;
                        vars.filehd = fileold
                    }
                }
                if (vars.file.indexOf(",") > -1 && vars.file.indexOf('[') == -1) {
                    vars.file = '[' + vars.file + ']'
                }
                if (vars.file.indexOf('[') > -1 && vars.file.indexOf(']') > -1) {
                    var hdf = vars.file.substr(vars.file.indexOf('[') + 1, vars.file.indexOf(']') - vars.file.indexOf('[') - 1).split(vars.hdseparator);
                    var files = '';
                    for (h = 0; h < hdf.length; h++) {
                        files += hdf[h] != '' ? vars.file.substr(0, vars.file.indexOf('[')) + hdf[h] + vars.file.substr(vars.file.indexOf(']') + 1) : '';
                        h < hdf.length - 1 ? files += ',' : ''
                    }
                    vars.hdlinks = files.split(',');
                    HdSelect();
                    if (hdselect) {
                        vars.file = hdselect.value
                    } else {
                        for (h = 0; h < vars.hdlinks.length; h++) {
                            if (vars.hdlinks[h] != '') {
                                vars.file = vars.hdlinks[h];
                                break
                            }
                        }
                    }
                }
            }
        }
    }

    function HdSelect() {
        if (hd_b) {
            if (hdselect && vars.hdlinks) {
                var start = 0;
                var hdselects = [];
                hdselect.innerHTML = '';
                vars.hd1 == 1 ? vars.quality = vars.hda[vars.hda.length - 1] : '';
                for (h = 0; h < vars.hda.length; h++) {
                    if (vars.hdlinks[h]) {
                        if (vars.hdlinks[h] != '') {
                            hdselects[h] = document.createElement('option');
                            hdselects[h].value = vars.hdlinks[h];
                            hdselects[h].innerHTML = vars.hda[h];
                            hdselect.appendChild(hdselects[h]);
                            if (vars.hda[h] == vars.quality) {
                                start = h;
                                hdselects[h].setAttribute("selected", "true");
                                QualitySelect(false)
                            }
                        }
                    }
                }
                SelectRework(hdselect.options[start].text, hd_b)
            }
        }
    }

    function QualitySelecter() {
        QualitySelect(true)
    }

    function QualitySelect(autostart) {
        if (hd_b && vars.hdlinks) {
            if (vars.youtube) {
                autostart ? vars.start = media_yt.getCurrentTime() : '';
                isYoutube() ? media_yt.setPlaybackQuality(hdselect.value) : ''
            } else {
                autostart ? vars.start = media.currentTime : '';
                vars.file = hdselect.value;
                NewFile(hdselect.value, autostart)
            }
            SelectRework(hdselect.options[hdselect.selectedIndex].text, hd_b);
            vars.quality = hdselect.options[hdselect.selectedIndex].text;
            Event('quality', vars.quality)
        }
    }

    function Full(re) {
        if (!ifull || re == 're') {
            if (vars.realfullscreen == 1 && Uppod.Fullscreen.request(vars.stg)) {
                irealfull = true
            }
            Uppod.Fullscreen.hack(vars.stg);
            if (vars.iframe != '' && !irealfull) {
                CSS(window.parent.document.getElementById(vars.iframe), {
                    'width': window.parent.innerWidth,
                    'height': window.parent.innerHeight,
                    'position': 'fixed',
                    'left': 0,
                    'top': 0
                })
            }
            if (re != 're') {
                ifull = true;
                vars.stagewidth = vars.sw;
                vars.stageheight = vars.sh;
                CSS(body.canvas, {
                    'visibility': 'hidden',
                    'height': (vars.iframe != '' ? window.parent.innerHeight : window.innerHeight)
                });
                setTimeout(function() {
                    CSS(body.canvas, {
                        'visibility': 'hidden',
                        'height': (vars.iframe != '' ? window.parent.innerHeight : window.innerHeight)
                    })
                }, 500);
                setTimeout(function() {
                    CSS(body.canvas, {
                        'visibility': 'hidden',
                        'height': (vars.iframe != '' ? window.parent.innerHeight : window.innerHeight)
                    })
                }, 700);
                CSS(scrn.canvas, {
                    'visibility': 'hidden'
                });
                CSS(media_mc, {
                    'backgroundColor': '#000',
                    'position': 'fixed',
                    'left': 0,
                    'top': 0
                })
            }
            full_b.c.style.display = 'none';
            full_back_b.c.style.display = 'block';
            if (vars.stageposition = '' && vars.stg.style.position) {
                vars.stageposition = vars.stg.style.position
            }
            vars.stageleft = vars.stg.style.left;
            vars.stagetop = vars.stg.style.top;
            vars.stageMarginTop = vars.stg.style['margin-top'];
            CSS(vars.stg, {
                'width': '100%',
                'height': '100%',
                'margin-top': '0px',
                'position': 'fixed',
                'left': '0px',
                'top': '0px',
                'z-index': '999999999',
                'overflow': 'hidden'
            });
            layer != undefined ? layer.style.display = 'none' : '';
            oo ? oo.style.display = 'none' : '';
            clearInterval(hideInterval);
            hideInterval = setInterval(CntrlHide, 3000);
            if (re != 're') {
                Event('fullscreen')
            }
            if (tip) {
                if (tip.parentNode) {
                    tip.parentNode.removeChild(tip)
                }
            }
        } else {
            FullOff()
        }
        setTimeout(MenuPosition, 100);
        if (playlist) {
            CSS(playlist, {
                'top': -1000
            })
        }
        logo ? PositionLogo() : '';
        sub || sub_menu ? setTimeout(PositionSub, 500) : ''
    }

    function FullOff() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen()
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.cancelFullscreen) {
            document.cancelFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
        ifull = false;
        if (vars.iframe != '' && !irealfull) {
            CSS(window.parent.document.getElementById(vars.iframe), {
                'width': vars.stagewidth,
                'height': vars.stageheight,
                'margin-top': vars.stageMarginTop,
                'position': 'static',
                'left': 0,
                'top': 0
            })
        }
        CSS(media_mc, {
            'backgroundColor': 'transparent',
            'position': 'absolute',
            'left': 0,
            'top': 0
        });
        CSS(vars.stg, {
            'width': vars.stagewidth,
            'height': vars.stageheight,
            'margin-top': vars.stageMarginTop,
            'position': (vars.stageposition == '' ? 'static' : vars.stageposition),
            'left': vars.stageleft,
            'top': vars.stagetop
        });
        CSS(body.canvas, {
            'visibility': 'visible',
            'height': vars.stageheight
        });
        CSS(scrn.canvas, {
            'visibility': 'visible'
        });
        if (!isYoutube() && layer != undefined) {
            layer.style.display = 'block'
        }
        if (oo) {
            oo.style.display = 'block'
        }
        full_b.c.style.display = 'block';
        full_back_b.c.style.display = 'none';
        if (playlist) {
            PlPlace()
        }
        logo ? PositionLogo() : '';
        sub || sub_menu ? setTimeout(PositionSub, 500) : '';
        if (tip) {
            if (tip.parentNode) {
                tip.parentNode.removeChild(tip)
            }
        }
        Event('exitfullscreen')
    }
    var menu_big;

    function Menu() {
        if (menu_big) {
            ShowHide(menu_big)
        } else {
            menu_big = document.createElement('div');
            var mb_w = vars.scrn_w < 320 ? vars.scrn_w - 30 : 350;
            var mb_h = (vars.download != '' && vars.download != 0 ? 45 : 0) + (vars.menu_nocode == 1 ? 0 : 45) + (vars.link != '' ? 45 : 0) + 11;
            vars.menu_w = mb_w;
            vars.menu_h = mb_h;
            var menu_big_bg = new Shaper2({
                w: mb_w,
                h: mb_h,
                o: 10,
                bgc: '000000|000000',
                bga1: 0.5,
                bga2: 0.5
            });
            menu_big.appendChild(menu_big_bg.c);
            CSS(menu_big_bg.c, {
                'position': 'relative',
                'top': '0',
                'left': '0'
            });
            if (vars.download != '' && vars.download != 0) {
                MenuBigItem("menu_download", (vars.download == 1 ? vars.file : vars.download), mb_w, mb_h)
            }
            if (vars.link != '') {
                MenuBigItem("menu_link", vars.link, mb_w, mb_h)
            }
            CSS(menu_big, {
                'color': '#ffffff',
                'font': '10px Verdana'
            });
            menu_big.style.zIndex = 6;
            MenuBigItem("menu_code", (vars.iframeurl != '' ? '<iframe title="sample" width="' + vars.w + '" height="' + vars.h + '" src="' + vars.iframeurl + '" frameborder="0" allowfullscreen></iframe>' : vars.embedcode != '' ? vars.embedcode : ''), mb_w, mb_h);
            var mbx = document.createElement('div');
            mbx.innerHTML = '&nbsp; x &nbsp;';
            menu_big.appendChild(mbx);
            CSS(mbx, {
                'position': 'absolute',
                'top': 3,
                'left': mb_w - 25,
                'cursor': 'pointer'
            });
            mbx.onclick = MenuClose;
            body.c.appendChild(menu_big);
            MenuPosition()
        }
    }
    var menuitems = 0;

    function MenuBigItem(what, content, mb_w, mb_h) {
        var mbkodt = document.createElement('div');
        mbkodt.innerHTML = vars.lang2[what];
        menu_big.appendChild(mbkodt);
        CSS(mbkodt, {
            'position': 'absolute',
            'top': (5 + menuitems * 45),
            'left': 15
        });
        var mbkodbg = new Shaper2({
            w: mb_w - 20,
            h: 23,
            o: 5,
            bgc: 'ffffff'
        });
        CSS(mbkodbg.c, {
            'position': 'absolute',
            'top': (22 + menuitems * 45),
            'left': 10
        });
        menu_big.appendChild(mbkodbg.c);
        var mbkode = document.createElement('input');
        menu_big.appendChild(mbkode);
        CSS(mbkode, {
            'position': 'absolute',
            'outline': 'none',
            'font': '10px Verdana',
            'top': (25 + menuitems * 45),
            'left': 13,
            'width': mb_w - 28,
            'height': 15,
            'color': '#000000',
            'border': 0,
            'background': 'none'
        });
        mbkode.value = content;
        mbkode.onclick = function() {
            this.select()
        };
        menuitems++
    }

    function MenuClose() {
        if (menu_big) {
            CSS(menu_big, {
                'display': 'none'
            })
        }
    }

    function MenuPosition() {
        if (menu_big) {
            CSS(menu_big, {
                'position': 'absolute',
                'top': ((ifull ? vars.sh : vars.stageheight) - vars.menu_h) / 2,
                'left': ((ifull ? vars.sw : vars.stagewidth) - vars.menu_w) / 2
            })
        }
    }

    function CntrlHide() {
        var hide_force = false;
        if (uppod.ads()) {
            uppod.ads().isActive() ? hide_force = true : ''
        }
        if ((iplay && CurrentTime() > 0) || hide_force) {
            var hide = !iover && vars.cntrlhide == 1;
            var fullHide = ifull && vars.fullcntrlhide == 1;
            if (hide || fullHide || hide_force) {
                clearInterval(hideInterval);
                CSS(controls, {
                    'visibility': 'hidden'
                });
                if (playlist) {
                    CSS(playlist, {
                        'visibility': 'hidden'
                    })
                }
                if (isYoutube()) {
                    mouseMoveCatcher.style.display = 'block'
                }
                ihide = true
            }
        }
    }

    function CntrlShow() {
        clearInterval(hideInterval);
        mouseMoveCatcher.style.display = 'none';
        CSS(controls, {
            'visibility': 'visible'
        });
        if (playlist) {
            CSS(playlist, {
                'visibility': 'visible'
            })
        }
        ihide = false
    }

    function ScreenSize() {
        vars.scrn_w = vars.sw - vars.padding * 2;
        vars.scrn_h = vars.ph - vars.padding * 2 - (vars.cntrlout == 1 ? vars.cntrloutheight : 0)
    }

    function Resize() {
        if (vars.sw != 0 && vars.sh != 0 && vars.stg.offsetHeight != 0 && vars.stg.offsetWidth != 0) {
            if (vars.ph != vars.sh) {
                vars.ph = vars.stg.offsetHeight - (vars.sh - vars.ph)
            } else {
                vars.ph = vars.stg.offsetHeight
            }
            vars.sh = vars.stg.offsetHeight;
            vars.sw = vars.stg.offsetWidth;
            if (!ifull) {
                vars.stagewidth = vars.sw;
                vars.stageheight = vars.sh
            }
            ScreenSize();
            var nh = (!ifull ? vars.ph : vars.sh) - vars.padding * 2 - (vars.cntrlout == 1 ? vars.cntrloutheight : 0);
            if (!ifull) {
                CSS(body.canvas, {
                    'width': vars.sw,
                    'height': vars.sh
                });
                CSS(scrn.canvas, {
                    'width': vars.sw - vars.padding * 2,
                    'height': nh
                })
            }
            if (alrt) {
                CSS(alrt_bg.canvas, {
                    'width': '' + vars.sw - (ifull ? 0 : vars.padding * 2) + 'px'
                });
                if (vars.padding > 0) {
                    CSS(alrt, {
                        'top': (ifull ? 0 : vars.padding),
                        'left': (ifull ? 0 : vars.padding)
                    })
                }
            }
            if (poster_mc) {
                CSS(poster_mc, {
                    'width': vars.sw,
                    'height': vars.ph - vars.padding * 2 - (vars.cntrlout == 1 ? vars.cntrloutheight : 0)
                })
            }
            CSS(media_mc, {
                'width': '' + vars.sw - (!ifull ? vars.padding * 2 : 0) + 'px',
                'height': '' + nh + 'px'
            });
            CSS(media, {
                'width': '' + vars.sw - (!ifull ? vars.padding * 2 : 0) + 'px',
                'height': '' + nh + 'px'
            });
            if (isYoutube()) {
                CSS(uppod.document.getElementById('yt_media_' + vars.uid), {
                    'width': '' + vars.sw - (!ifull ? vars.padding * 2 : 0) + 'px',
                    'height': '' + nh + 'px'
                })
            }
            vars.o > 0 ? oPos() : '';
            uppod.controls().ControlBar.resize();
            if (uibg) {
                CSS(uibg.canvas, {
                    'width': '' + (vars.sw - (ifull ? 0 : vars.padding * 2)) + 'px',
                    'height': '' + vars.cntrloutheight + 'px'
                });
                uibg_gl ? CSS(uibg_gl.canvas, {
                    'width': '' + (vars.sw - (ifull ? 0 : vars.padding * 2)) + 'px'
                }) : ''
            }
            start_b ? CSS(start_b.c, {
                'left': vars.sw / 2 - start_b.w / 2,
                'top': (!ifull ? vars.ph : vars.sh) / 2 - start_b.h / 2
            }) : '';
            PlaceControls();
            if (playlist) {
                PlPlace()
            }
            if (sub) {
                PositionSub()
            }
        }
    }

    function Back() {
        Seek(0)
    }

    function Mute() {
        if (isYoutube()) {
            if (!media_yt.isMuted()) {
                media_yt.mute();
                muted = true
            } else {
                media_yt.unMute();
                muted = false
            }
        } else {
            if (media.muted) {
                media.muted = false;
                muted = false
            } else {
                media.muted = true;
                muted = true
            }
        }
        MuteControl()
    }

    function MuteControl() {
        if (volume_b) {
            if (muted) {
                volume_b.c.style.display = 'none'
            } else {
                volume_b.c.style.display = 'block'
            }
        }
        if (volume_mute_b) {
            if (muted) {
                volume_mute_b.c.style.display = 'block'
            } else {
                volume_mute_b.c.style.display = 'none'
            }
        }
    }

    function OnPlay() {
        Uppod.trace('OnPlay');
        if (!iplay) {
            if (nativecontrols && !media.controls) {
                CSS(controls, {
                    'visibility': 'hidden'
                });
                media.controls = true;
                Remove('layer');
                media_mc.onclick = null
            }
            if (poster_mc && vars.m == 'video') {
                poster_mc.style.display = 'none'
            }
            if (play_b != undefined) {
                play_b.c.style.display = 'none';
                pause_b.c.style.display = 'block'
            }
            iplay = true;
            var hide = vars.cntrlhide == 1 && vars.cntrlout == 0;
            var fullHide = ifull && vars.fullcntrlhide == 1;
            if (hide || fullHide) {
                clearInterval(hideInterval);
                hideInterval = setInterval(CntrlHide, 3000)
            }
            if (vars.comment != undefined && vars.comment != '' && vars.showname == 1) {
                vars.shownameliketip == 1 ? (vars.shownameonstop == 1 ? Hide(nametip) : '') : Hide(alrt)
            }
            if (vars.plplace == "inside" && playlist) {
                Hide(playlist)
            }
            if (start_b) {
                start_b.c.style.display = 'none'
            }
            Event('play');
            if (!istartevnt) {
                Event('start');
                istart = true;
                istartevnt = true
            }
            if (vars.sub && (vars.substart == 1 || (mobile && nativecontrols))) {
                CreateSubs()
            }
        }
    }

    function OnSeeking() {
        Event('seeking')
    }

    function OnSeeked() {
        Event('seeked')
    }

    function OnPause() {
        Uppod.trace('OnPause');
        if (iplay) {
            if (play_b != undefined) {
                play_b.c.style.display = 'block';
                pause_b.c.style.display = 'none'
            }
            iplay = false;
            if (vars.comment != undefined && vars.comment != '' && vars.showname == 1) {
                vars.shownameliketip == 1 ? Show(nametip) : Show(alrt)
            }
            start_b ? start_b.c.style.display = 'block' : '';
            Event('pause')
        }
    }

    function Event(s, msg) {
        vars.events[s] = msg;
        var evObj = document.createEvent('Events');
        evObj.initEvent(s, true, true);
        vars.stg.dispatchEvent(evObj)
    }

    function onCanPlay() {
        Uppod.trace('onCanPlay');
        if (vars.start > 0) {
            Uppod.trace('onCanPlay set currentTime to ' + vars.start);
            media.currentTime = vars.start;
            vars.start = 0
        }
        onReady()
    }

    function OnVolume() {
        if (volbarline_all_b) {
            vars.ivolbar_v ? VolumeDraw(media.volume * volbarline_s['h']) : VolumeDraw(media.volume * volbarline_s['w'])
        }
        if (volbar_b) {
            VolumeDraw(media.volume * vars.cntrlvolbar.w)
        }
    }

    function OnEnded() {
        Uppod.trace('OnEnded');
        if (media.ended || isYoutube()) {
            Event('end');
            if (vars.radio == 1) {
                Reload()
            } else {
                if (!isYoutube()) {
                    Back()
                }
                if (vars.plplay == 1 && pl) {
                    PlNext()
                } else {
                    TheEnd()
                }
            }
        }
    }

    function Reload() {
        Uppod.trace('Reload');
        Stop();
        Toggle()
    }

    function Sizing() {
        if (vars.stg.offsetWidth != vars.sw || vars.stg.offsetHeight < vars.sh - 5 || vars.stg.offsetHeight > vars.sh + 5) {
            Resize()
        }
    }

    function Playing() {
        if (media != undefined) {
            updateTimeDisplay();
            if (iline) {
                var time = 0;
                var duration = 0;
                time = CurrentTime();
                duration = Duration();
                if (isYoutube()) {
                    CSS(line_load_b, {
                        'width': '' + (media_yt.getVideoLoadedFraction() * line_all_b.w) + 'px'
                    })
                } else {
                    if (media.buffered) {
                        if (media.buffered.length > 0) {
                            CSS(line_load_b, {
                                'width': '' + (media.buffered.end(media.buffered.length - 1) / media.duration) * line_all_b.w + 'px'
                            })
                        }
                    }
                }
                CSS(line_play_b, {
                    'width': '' + (time / duration) * line_all_b.w + 'px'
                });
                if (ibuff && !igo) {
                    if (time > 0) {
                        HideBuffer();
                        igo = true
                    }
                }
                if (iplay && time == lastTime) {
                    if (ltc > 5) {
                        !ibuff ? ShowBuffer() : '';
                        ibuff = true
                    } else {
                        ltc++
                    }
                } else {
                    if (ibuff) {
                        ibuff = false;
                        HideBuffer()
                    }
                    ltc = 0
                }
                lastTime = time
            }
            if (iplay && vars.reloader == 1) {
                if (CurrentTime() == vars.reloadertime) {
                    vars.reloadercounter++;
                    if (vars.reloadercounter > 100 && media.currentTime != undefined) {
                        vars.reloadercounter = 0;
                        Reload()
                    }
                } else {
                    vars.reloadercounter = 0
                }
                vars.reloadertime = CurrentTime()
            }
            if (vars.eventtime != 0) {
                if (iplay) {
                    if (is_array(vars.eventtime)) {
                        for (i = 0; i < vars.eventtime.length; i++) {
                            if (!vars.events['time' + vars.eventtime[i]]) {
                                if (CurrentTime() > vars.eventtime[i]) {
                                    Event('time' + vars.eventtime[i], CurrentTime())
                                }
                            }
                        }
                    } else {
                        if (!vars.events['time']) {
                            if (CurrentTime() > vars.eventtime) {
                                Event('time', CurrentTime())
                            }
                        }
                    }
                }
            }
            if (vars.eventplayed != 0) {
                if (iplay) {
                    if (is_array(vars.eventplayed)) {
                        for (i = 0; i < vars.eventplayed.length; i++) {
                            if (!vars.events['played' + vars.eventplayed[i]]) {
                                if ((CurrentTime() / Duration()) * 100 > vars.eventplayed[i]) {
                                    Event('played' + vars.eventplayed[i], (CurrentTime() / Duration()) * 100)
                                }
                            }
                        }
                    } else {
                        if (!vars.events['played']) {
                            if ((CurrentTime() / Duration()) * 100 > vars.eventplayed) {
                                Event('played', (CurrentTime() / Duration()) * 100)
                            }
                        }
                    }
                }
            }
            line_b && run_b ? RunPos(run_b, line_b, line_play_b, line_all_b, run_pos) : '';
            if (sub != undefined && vars.substart == 1) {
                if (sub[sub_lang]) {
                    if (sub[sub_lang][1]) {
                        var t = parseInt(CurrentTime() * 10);
                        if (sub[sub_lang][1][t] != null) {
                            var str = '';
                            if (vars.sublangsall == 1 && sub_lang_all) {
                                for (var i = 0; i < sub.length; i++) {
                                    str += sub[i][0][sub[i][1][t]] ? sub[i][0][sub[i][1][t]] + (i < sub.length - 1 ? '<br>' : '') : ''
                                }
                            } else {
                                str = sub[sub_lang][0][sub[sub_lang][1][t]]
                            }
                            if (sub) {
                                var stop = false;
                                if (sub_last) {
                                    sub_last == str ? stop = true : ''
                                }!sub_showed ? stop = false : '';
                                !stop ? ShowSub(str) : ''
                            }
                        }
                        if (sub[sub_lang][1][t] == undefined && sub_showed) {
                            StopSub()
                        }
                    }
                }
            }
        }
        if (ifull && !irealfull) {
            if (vars.iframe != '') {
                window.parent.innerWidth != vars.stg.offsetWidth || window.parent.innerHeight != vars.stg.offsetHeight ? Full('re') : ''
            } else {
                window.innerWidth != vars.stg.offsetWidth || window.innerHeight != vars.stg.offsetHeight ? Full('re') : ''
            }
        }
    }

    function CurrentTime() {
        t = 0;
        if (isYoutube()) {
            t = media_yt.getCurrentTime()
        } else {
            media ? t = media.currentTime : ''
        }
        return t
    }

    function Duration() {
        t = 0;
        if (isYoutube()) {
            t = media_yt.getDuration()
        } else {
            if (media) {
                if (media.duration && media.duration != 'Infinity') {
                    t = media.duration
                }
            }
        }
        return t
    }

    function NotFound() {
        if (vars.or.length > 1) {
            if (vars.ori == vars.or.length - 1) {
                vars.ori = -1
            }
            vars.ori++;
            NewFile(vars.or[vars.ori])
        } else {
            Pause();
            if (vars.alerts == 1) {
                var message = vars.lang2['file'] + ' ' + vars.lang2['notfound'];
                Alert(message)
            }
            Event('player_error', 'file not found')
        }
    }

    function TheEnd() {
        if (!nativecontrols) {
            CntrlShow()
        }
        if (media) {
            if (!isYoutube()) {
                media.currentTime = 0;
                media.pause()
            } else {
                media_yt.pauseVideo()
            }
        }
        if (vars.menuauto == 1 && menu_b) {
            isVisible(menu_big) ? '' : Menu()
        }
        Event('end')
    }

    function isVisible(mc) {
        var out = false;
        if (mc) {
            mc.style.visible != 'none' ? out = true : ''
        }
        return out
    }

    function FontStyle(f) {
        var out = 'normal';
        if (f == 'i' || f == 'b><i') {
            out = 'italic'
        }
        return out
    }

    function FontWeight(f) {
        var out = 'normal';
        if (f == 'b' || f == 'b><i') {
            out = 'bold'
        }
        return out
    }

    function ShowBuffer() {
        if (buffer_b) {
            uppod.controls().Buffer.show()
        }
    }

    function HideBuffer() {
        if (buffer_b) {
            uppod.controls().Buffer.hide()
        }
        ibuff = false
    }

    function updateTimeDisplay() {
        time_play_b ? time_play_b.c.innerHTML = formatTime(CurrentTime()) : '';
        time_all_b ? time_all_b.c.innerHTML = formatTime(Duration()) : ''
    }

    function formatTime(seconds, tip) {
        var seconds = Math.round(seconds);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
        seconds = Math.floor(seconds % 60);
        (hours > 0 || timelength > 5) && minutes < 10 ? minutes = "0" + minutes : "";
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        var out = (hours > 0 || timelength > 5 ? hours + ":" : "") + minutes + ":" + seconds;
        if (out.length != timelength && !tip) {
            timelength = out.length;
            PlaceControls()
        }
        return out
    }

    function CreateSubs() {
        var subs = vars.sub.split(',');
        var clangs = vars.sublangs ? vars.sublangs.split(',') : Array();
        sub = Array();
        for (var i = 0; i < subs.length; i++) {
            clangs[i] == undefined ? clangs[i] = i + 1 : '';
            CreateSub(i, subs[i], clangs[i]);
            clangs[i] && vars.sublang ? (clangs[i] == vars.sublang ? sub_lang = i : '') : ''
        }
    }

    function CreateSub(l, url, label) {
        if (url) {
            if (url.indexOf('#') == 0) {
                url = un(url)
            }
            var url_shift = vars.sub_shift;
            if (url.indexOf('shift=') > 0) {
                url_shift = url.substr(url.indexOf('shift=') + 6) * 1
            }
            if (mobile && nativecontrols) {
                var track = document.createElement('track');
                track.setAttribute('src', url);
                track.setAttribute('label', label);
                vars.substart == 1 && l == 0 ? track.setAttribute('default', 'true') : '';
                media.appendChild(track)
            } else {
                var subtxt = LoadFile(url);
                if (subtxt) {
                    if (url.indexOf('.srt') > -1 || url.indexOf('.ass') > -1 || url.indexOf('.ssa') > -1 || url.indexOf('.vtt') > -1) {
                        sub[l] = Object();
                        sub[l][0] = Array();
                        sub[l][1] = Array();
                        var rows = Array();
                        rows = subtxt.split('\n');
                        var cnt = 1;
                        var t1 = 0;
                        var t2 = 0;
                        for (i = 0; i < rows.length; i++) {
                            if (url.indexOf('.srt') > -1 || url.indexOf('.vtt') > -1) {
                                if (rows[i].indexOf('-->') > -1 && rows[i].indexOf(':') > -1) {
                                    t1 = TimerSub(rows[i].substr(0, rows[i].indexOf('-->'))) * 1 + url_shift;
                                    t2 = TimerSub(rows[i].substr(rows[i].indexOf('-->') + 4, 12)) * 1 + url_shift;
                                    sub[l][0][t1] = '';
                                    for (var j = t1; j < t2; j++) {
                                        sub[l][1][j] = t1
                                    }
                                    cnt++
                                } else {
                                    if (rows[i] != '' && rows[i].length > 1 && rows[i] != cnt) {
                                        sub[l][0][t1] += (sub[l][0][t1] != '' ? '<br>' : '') + rows[i]
                                    }
                                }
                            }
                            if (url.indexOf('.ass') > -1 || url.indexOf('.ssa') > -1) {
                                if (rows[i].indexOf('Dialogue:') > -1) {
                                    t1 = TimerSub(rows[i].substr((url.indexOf('.ssa') > -1 ? rows[i].indexOf('=0') + 3 : 12), 12)) * 1 + url_shift;
                                    t2 = TimerSub(rows[i].substr((url.indexOf('.ssa') > -1 ? rows[i].indexOf('=0') + 14 : 23), 10)) * 1 + url_shift;
                                    var p = '';
                                    if (rows[i].indexOf('0,,') > 0) {
                                        p = rows[i].substr(rows[i].indexOf('0,,') + 3)
                                    } else {
                                        if (rows[i].indexOf('ffect,') > 0) {
                                            p = rows[i].substr(rows[i].indexOf('ffect,') + 6)
                                        }
                                    }
                                    if (sub[l][0][t1] != undefined) {
                                        sub[l][0][t1] += '\n' + p
                                    } else {
                                        sub[l][0][t1] = p
                                    }
                                    sub[l][0][t1] = sub[l][0][t1].replace(/{.*?}/, '');
                                    sub[l][0][t1] = sub[l][0][t1].replace(/\\\\N/, '\n');
                                    for (var j = t1; j < t2; j++) {
                                        sub[l][1][j] = t1
                                    }
                                }
                            }
                        }
                    }
                }
                vars.substart = 1
            }
        }
    }

    function ShowSub(str) {
        if (sub_text) {
            KillSub()
        }
        sub_text = document.createElement('div');
        sub_bg = document.createElement('div');
        body.c.appendChild(sub_bg);
        body.c.appendChild(sub_text);
        Show(sub_text);
        Show(sub_bg);
        sub_last = str;
        sub_text.innerHTML = str;
        sub_showed = true;
        PositionSub()
    }

    function StopSub() {
        if (sub_text) {
            KillSub();
            sub_showed = false
        }
    }

    function KillSub() {
        if (sub_text) {
            sub_text.innerHTML = '';
            body.c.removeChild(sub_bg);
            body.c.removeChild(sub_text);
            sub_bg = null;
            sub_text = null
        }
    }

    function PositionSub() {
        var h = (!ifull ? vars.ph : vars.sh) - (vars.cntrlout == 1 && !ifull ? vars.padding / 2 : vars.cntrloutheight);
        if (sub_text) {
            var width = vars.sw - 60;
            CSS(sub_text, {
                "position": "absolute",
                "color": (vars.subcolor.length == 6 ? '#' : '') + vars.subcolor,
                'fontFamily': vars.subfont,
                'fontSize': (vars.subsize * (ifull ? 1.5 : 1)) + '%',
                'text-align': 'center',
                'line-height': '120%',
                'text-shadow': '1px 1px 1px rgba(1,1,1,0.4)'
            });
            CSS(sub_bg, {
                "position": "absolute",
                "backgroundColor": (vars.subbgcolor.length == 6 ? '#' : '') + vars.subbgcolor,
                'opacity': vars.subbgalpha,
                'borderRadius': vars.subbgo / 2
            });
            CSS(sub_text, {
                'max-width': width
            });
            var top = h - vars.submargin * (ifull ? vars.sh / vars.stageheight : 1) - 10 - sub_text.offsetHeight - 5;
            var left = (vars.sw - (sub_text.offsetWidth + 20)) / 2;
            CSS(sub_text, {
                "position": "absolute",
                "top": top,
                "left": left + 10
            });
            CSS(sub_bg, {
                "width": sub_text.offsetWidth + 20,
                "height": sub_text.offsetHeight + 10,
                "position": "absolute",
                "top": top - 5,
                "left": left
            })
        }
        if (sub_menu) {
            var top2 = (h - sub_menu.offsetHeight);
            var left2 = sub_b.c.offsetLeft - sub_menu.offsetWidth + sub_b.w + 5;
            left2 < 0 ? left2 = 0 : '';
            CSS(sub_menu, {
                "position": "absolute",
                "top": top2,
                "left": left2
            });
            CSS(sub_menu_bg, {
                "position": "absolute",
                "top": top2,
                "left": left2
            })
        }
    }

    function TimerSub(srt) {
        var tmp = srt.split(':');
        var out = 0;
        tmp[0] != '00' ? out += tmp[0] * 3600 : '';
        tmp[1] != '00' ? out += tmp[1] * 60 : '';
        out += tmp[2].substr(0, 2) * 1;
        out = out * 10 + tmp[2].substr(3, 1) * 1;
        return out
    }

    function SetSub() {
        if (sub_menu) {
            ToggleView(sub_menu_bg);
            ToggleView(sub_menu);
            PositionSub()
        } else {
            sub_menu = document.createElement('div');
            sub_menu_bg = document.createElement('div');
            body.c.appendChild(sub_menu_bg);
            body.c.appendChild(sub_menu);
            sub_menu.innerHTML = '<div id="uppodplayer_sub_switcher" style="width:47px;height:18px;border:1px solid rgba(255,255,255,0.5);border-radius:20px;margin-bottom:10px;padding:1px;cursor:pointer"><div id="uppodplayer_sub_switcher_bg" style="width:45px;height:16px;background:#fff;border-radius:18px;padding:1px;"><div id="uppodplayer_sub_switcher_dot" style="width:16px;height:16px;background:#000;border-radius:17px;color:#000;text-align:center;' + (vars.substart == 0 ? 'float:left' : 'float:right') + '"></div></div></div>';
            uppod.document.getElementById("uppodplayer_sub_switcher").onclick = ToggleSub;
            var sub_menu_x = document.createElement('div');
            sub_menu.appendChild(sub_menu_x);
            CSS(sub_menu_x, {
                "fontSize": "80%",
                "position": "absolute",
                "top": 5,
                "right": 7,
                "color": "#fff",
                "opacity": 0.5,
                "margin-top": "-2px",
                "cursor": "pointer"
            });
            sub_menu_x.innerHTML = '×';
            sub_menu_x.onclick = SetSub;
            CSS(sub_menu, {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "color": "#fff",
                "font": "90% sans-serif",
                "borderRadius": 10,
                "padding": 10,
                "width": 119
            });
            sub_menu2 = document.createElement('div');
            ToggleSubStyle();
            sub_menu.appendChild(sub_menu2);
            var b1 = document.createElement('div');
            SetSubButStyle(b1, false);
            b1.innerHTML = '+';
            CSS(b1, {
                "margin": "0 5px 5px 0"
            });
            var b2 = document.createElement('div');
            SetSubButStyle(b2, false);
            b2.innerHTML = '-';
            CSS(b2, {
                "margin": "0 20px 5px 0"
            });
            b1.onclick = function() {
                vars.subsize += 10;
                PositionSub()
            };
            b2.onclick = function() {
                vars.subsize -= 10;
                PositionSub()
            };
            var b3 = document.createElement('div');
            SetSubButStyle(b3, false);
            b3.innerHTML = '∧';
            CSS(b3, {
                "margin": "0 5px 5px 0"
            });
            var b4 = document.createElement('div');
            SetSubButStyle(b4, false);
            b4.innerHTML = '∨';
            CSS(b4, {
                "margin": "0 0 5px 0"
            });
            b3.onclick = function() {
                vars.submargin += 10;
                PositionSub()
            };
            b4.onclick = function() {
                vars.submargin -= 10;
                PositionSub()
            };
            var s1 = document.createElement('br');
            sub_menu2.appendChild(s1);
            var c = Array();
            var ccolors = Array("FFFFFF", "000000", "FAED54", "FFB0BE", "72CCF8", "62DE50", "E8BBFF", "FEBA54");
            var c_def = 2;
            for (var i = 0; i < 7; i++) {
                c[i] = document.createElement('div');
                SetSubButStyle(c[i], true);
                CSS(c[i], {
                    "border": "1px solid #" + (i == 1 ? '666' : ccolors[i]),
                    "opacity": 0.7,
                    "color": "#" + (ccolors[i])
                });
                c[i].onclick = function() {
                    vars.subcolor = this.style.color;
                    isub_menu_color.style.opacity = 0.7;
                    this.style.opacity = 1;
                    isub_menu_color = this;
                    PositionSub()
                };
                vars.subcolor == ccolors[i] ? c_def = i : ''
            }
            c[c_def].style.opacity = 1;
            isub_menu_color = c[c_def];
            var s2 = document.createElement('br');
            sub_menu2.appendChild(s2);
            var cbg = Array();
            var cbgcolors = Array("FFFFFF", "000000", "FEF370", "D90000", "073DA0", "409829", "644082", "a56305");
            var cbg_def = 1;
            for (i = 0; i < 7; i++) {
                cbg[i] = document.createElement('div');
                SetSubButStyle(cbg[i], true);
                CSS(cbg[i], {
                    "background-color": "#" + (cbgcolors[i]),
                    "borderColor": "#" + (i == 1 ? '666' : cbgcolors[i]),
                    "opacity": 0.7,
                    "color": "#fff"
                });
                i == 0 || i == 2 ? CSS(cbg[i], {
                    "color": "#000"
                }) : '';
                cbg[i].onclick = function() {
                    vars.subbgcolor = this.style.backgroundColor;
                    isub_menu_bgcolor.style.opacity = 0.7;
                    this.style.opacity = 1;
                    isub_menu_bgcolor = this;
                    PositionSub()
                };
                vars.subbgcolor == cbgcolors[i] ? cbg_def = i : ''
            }
            cbg[cbg_def].style.opacity = 1;
            isub_menu_bgcolor = cbg[cbg_def];
            var s3 = document.createElement('br');
            sub_menu2.appendChild(s3);
            var ca0 = document.createElement('div');
            sub_menu2.appendChild(ca0);
            CSS(ca0, {
                "float": "left",
                "margin": "0 2px 0 2px",
                "cursor": "default"
            });
            ca0.innerHTML = '-';
            var ca = document.createElement('div');
            CSS(ca, {
                "width": 91,
                "height": 4,
                "border": "1px solid #fff",
                "borderRadius": 4,
                "float": "left",
                "margin": "5px 3px",
                "cursor": "pointer"
            });
            sub_menu2.appendChild(ca);
            var ca2 = document.createElement('div');
            ca.appendChild(ca2);
            CSS(ca2, {
                "width": (vars.subbgalpha * 100) + "%",
                "height": 4,
                "borderRadius": 4,
                "background": "#fff"
            });
            var ca1 = document.createElement('div');
            sub_menu2.appendChild(ca1);
            CSS(ca1, {
                "float": "left",
                "margin": "0 0 0 2px",
                "fontSize": "80%",
                "cursor": "default"
            });
            ca1.innerHTML = '+';
            ca.onclick = function(e) {
                var n = e.clientX - findLeft(this);
                n < 5 ? n = 0 : '';
                CSS(this.firstElementChild, {
                    'width': n
                });
                vars.subbgalpha = n / this.offsetWidth;
                PositionSub()
            };
            if (vars.sublangs) {
                var clang = document.createElement('select');
                var clangs = vars.sublangs.split(',');
                for (var l = 0; l < clangs.length; l++) {
                    var cl = document.createElement('option');
                    cl.innerHTML = clangs[l];
                    clang.appendChild(cl);
                    if (clangs[l] == vars.sublang) {
                        sub_lang = l;
                        cl.setAttribute("selected", "true")
                    }
                }
                if (vars.sublangsall == 1 && clangs.length > 1) {
                    var cl = document.createElement('option');
                    cl.innerHTML = vars.lang2['all'];
                    clang.appendChild(cl)
                }
                sub_menu2.appendChild(clang);
                clang.onchange = function() {
                    if (vars.sublangsall == 1 && this.selectedIndex == this.length - 1) {
                        sub_lang = 0;
                        sub_lang_all = true
                    } else {
                        sub_lang_all = false;
                        sub_lang = this.selectedIndex
                    }
                };
                CSS(clang, {
                    'width': 120,
                    'cursor': 'pointer'
                })
            }
            CSS(sub_menu_bg, {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "background": "#000",
                "width": sub_menu.offsetWidth,
                "height": sub_menu.offsetHeight,
                "opacity": "0.7",
                "borderRadius": 10
            });
            PositionSub();
            sub_menu.style.zIndex = 7;
            sub_menu_bg.style.zIndex = 7
        }
    }

    function ToggleSub() {
        var el = sub_menu.firstElementChild.firstElementChild.firstElementChild;
        CSS(el, {
            "float": (vars.substart == 1 ? "left" : "right")
        });
        if (sub) {
            vars.substart == 0 ? vars.substart = 1 : vars.substart = 0
        } else {
            if (vars.sub && vars.substart == 0) {
                CreateSubs();
                vars.substart = 1
            } else {
                vars.substart == 0 ? vars.substart = 1 : vars.substart = 0
            }
        }
        if (vars.substart == 0) {
            StopSub()
        }
        ToggleSubStyle()
    }

    function ToggleSubStyle() {
        vars.substart == 0 ? CSS(sub_menu2, {
            "visibility": "hidden"
        }) : CSS(sub_menu2, {
            "visibility": "visible"
        });
        CSS(document.getElementById("uppodplayer_sub_switcher_dot"), {
            "background": (vars.substart == 0 ? "#fff" : "#000")
        });
        CSS(document.getElementById("uppodplayer_sub_switcher_bg"), {
            "background": (vars.substart == 0 ? 0 : "#fff")
        })
    }

    function SetSubButStyle(b, small) {
        sub_menu2.appendChild(b);
        CSS(b, {
            "float": "left",
            "textAlign": "center",
            "width": (small ? 11 : 20),
            "height": (small ? 11 : "auto"),
            "border": "1px solid rgba(255,255,255,0.5)",
            "borderRadius": (small ? 11 : 20),
            "margin": (small ? "3px 2px 7px 2px" : 0),
            "padding": (small ? "0" : "0 0 0 0"),
            "cursor": "pointer"
        })
    }

    function Controls() {
        if (vars.youtube && browser.restrictMediaPlay) {
            return
        }
        var controlsObj = uppod.controls();
        controlsObj.add(new Uppod.ControlBar(uppod));
        controls = controlsObj.ControlBar.dom;
        sep_b = [];
        sep = 0;
        CntrlBg();
        cntrl = vars.controls.split(',');
        cntrlength = 0;
        cntrls = [];
        cntrli = [];
        for (var i = 0; i < cntrl.length; i++) {
            if (cntrl[i] == 'play' || cntrl[i] == 'playstop') {
                play_b = new Element('play', 20, 20);
                controlsObj.addElement('Play', play_b);
                controls.appendChild(play_b.c);
                CSS(play_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - play_b.h) / 2 + play_b.s.margintop - play_b.s.marginbottom
                });
                play_b.c.onclick = Toggle;
                if (vars.tip == 1 && play_b.s.notip == 0) {
                    play_b.c.onmouseover = function() {
                        var txt = play_b.s.play_tip ? play_b.s.play_tip : vars.lang2['play'];
                        ToolTip(play_b.c, txt)
                    };
                    play_b.c.onmouseout = function() {
                        ToolTipHide(play_b.c)
                    }
                }
                pause_b = new Element((cntrl[i] == 'playstop' ? 'stop' : 'pause'), 20, 20, '', 'play');
                controlsObj.addElement('Pause', pause_b);
                controls.appendChild(pause_b.c);
                CSS(pause_b.c, {
                    'cursor': 'pointer',
                    'display': 'none',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - pause_b.h) / 2 + pause_b.s.margintop - pause_b.s.marginbottom
                });
                cntrl[i] == 'playstop' ? pause_b.c.onclick = Stop : pause_b.c.onclick = Toggle;
                cntrls[i] = pause_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + play_b.s.marginleft + play_b.s.marginright;
                cntrli[i] = play_b;
                if (vars.tip == 1 && pause_b.s.notip == 0) {
                    pause_b.c.onmouseover = function() {
                        ToolTip(pause_b.c, pause_b.s.pause_tip ? pause_b.s.pause_tip : vars.lang2['pause'])
                    };
                    pause_b.c.onmouseout = function() {
                        ToolTipHide(pause_b.c)
                    }
                }
            }
            if (cntrl[i] == 'back') {
                back_b = new Element('back', 30, 20);
                controlsObj.addElement('Back', back_b);
                controls.appendChild(back_b.c);
                CSS(back_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - back_b.h) / 2 + back_b.s.margintop - back_b.s.marginbottom
                });
                back_b.c.onclick = Back;
                cntrls[i] = back_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + back_b.s.marginleft + back_b.s.marginright;
                cntrli[i] = back_b;
                if (vars.tip == 1 && back_b.s.notip == 0) {
                    back_b.c.onmouseover = function() {
                        ToolTip(back_b.c, back_b.s.tip ? back_b.s.tip : vars.lang2['back'])
                    };
                    back_b.c.onmouseout = function() {
                        ToolTipHide(back_b.c)
                    }
                }
            }
            if (cntrl[i] == 'stop') {
                stop_b = new Element('stop', 20, 20);
                controlsObj.addElement('Stop', stop_b);
                controls.appendChild(stop_b.c);
                CSS(stop_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - stop_b.h) / 2 + stop_b.s.margintop - stop_b.s.marginbottom
                });
                stop_b.c.onclick = Stop;
                cntrls[i] = stop_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + stop_b.s.marginleft + stop_b.s.marginright;
                cntrli[i] = stop_b;
                if (vars.tip == 1 && stop_b.s.notip == 0) {
                    stop_b.c.onmouseover = function() {
                        ToolTip(stop_b.c, stop_b.s.tip ? stop_b.s.tip : vars.lang2['stop'])
                    };
                    stop_b.c.onmouseout = function() {
                        ToolTipHide(stop_b.c)
                    }
                }
            }
            if (cntrl[i].indexOf('my') == 0) {
                var m = cntrl[i].substr(2);
                mybuts[m] = new Element('my' + m, 20, 20);
                controls.appendChild(mybuts[m].c);
                CSS(mybuts[m].c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - mybuts[m].h) / 2 + mybuts[m].s.margintop - mybuts[m].s.marginbottom
                });
                mybuts[m].c.id = 'uppod_mybut' + m;
                mybuts[m].c.onclick = function() {
                    Mybut(this.id)
                };
                cntrls[i] = mybuts[m].w + vars.cntrlmargin;
                cntrlength += cntrls[i] + mybuts[m].s.marginleft + mybuts[m].s.marginright;
                cntrli[i] = mybuts[m];
                if (vars.tip == 1 && mybuts[m].s.notip == 0 && mybuts[m].s.tip) {
                    mybuts[m].c.onmouseover = function() {
                        ToolTip(mybuts[m].c, mybuts[m].s.tip)
                    };
                    mybuts[m].c.onmouseout = function() {
                        ToolTipHide(mybuts[m].c)
                    }
                }
            }
            if (cntrl[i] == 'download') {
                download_b = new Element('download', 20, 20);
                controlsObj.addElement('Download', download_b);
                controls.appendChild(download_b.c);
                CSS(download_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - download_b.h) / 2 + download_b.s.margintop - download_b.s.marginbottom
                });
                download_b.c.onclick = Download;
                cntrls[i] = download_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + download_b.s.marginleft + download_b.s.marginright;
                cntrli[i] = download_b;
                if (vars.tip == 1 && download_b.s.notip == 0) {
                    download_b.c.onmouseover = function() {
                        ToolTip(download_b.c, download_b.s.tip ? download_b.s.tip : vars.lang2['download'])
                    };
                    download_b.c.onmouseout = function() {
                        ToolTipHide(download_b.c)
                    }
                }
            }
            if (cntrl[i] == 'next') {
                next_b = new Element('next', 20, 20);
                controlsObj.addElement('Next', next_b);
                controls.appendChild(next_b.c);
                CSS(next_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - next_b.h) / 2 + next_b.s.margintop - next_b.s.marginbottom
                });
                next_b.c.onclick = Next;
                cntrls[i] = next_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + next_b.s.marginleft + next_b.s.marginright;
                cntrli[i] = next_b;
                if (vars.tip == 1 && next_b.s.notip == 0) {
                    next_b.c.onmouseover = function() {
                        ToolTip(next_b.c, next_b.s.tip ? next_b.s.tip : vars.lang2['next'])
                    };
                    next_b.c.onmouseout = function() {
                        ToolTipHide(next_b.c)
                    }
                }
            }
            if (cntrl[i] == 'prev') {
                prev_b = new Element('prev', 20, 20);
                controlsObj.addElement('Prev', prev_b);
                controls.appendChild(prev_b.c);
                CSS(prev_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - prev_b.h) / 2 + prev_b.s.margintop - prev_b.s.marginbottom
                });
                if (vars.random == 0) {
                    CSS(prev_b.c, {
                        'opacity': 0.3,
                        'filter': 'alpha(opacity=30)',
                        'cursor': 'default'
                    })
                }
                prev_b.c.onclick = Prev;
                cntrls[i] = prev_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + prev_b.s.marginleft + prev_b.s.marginright;
                cntrli[i] = prev_b;
                if (vars.tip == 1 && prev_b.s.notip == 0) {
                    prev_b.c.onmouseover = function() {
                        ToolTip(prev_b.c, prev_b.s.tip ? prev_b.s.tip : vars.lang2['prev'])
                    };
                    prev_b.c.onmouseout = function() {
                        ToolTipHide(prev_b.c)
                    }
                }
            }
            if (cntrl[i] == 'time_play') {
                time_play_b = new Element('time_play', 30, 20);
                controlsObj.addElement('TimePlay', time_play_b);
                controls.appendChild(time_play_b.c);
                CSS(time_play_b.c, {
                    'cursor': 'default',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - time_play_b.h) / 2 + 3 + time_play_b.s.margintop * 1 - time_play_b.s.marginbottom * 1,
                    'white-space': 'nowrap'
                });
                cntrls[i] = time_play_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + time_play_b.s.marginleft + time_play_b.s.marginright;
                cntrli[i] = time_play_b;
                timeitems++
            }
            if (cntrl[i] == 'time_all') {
                time_all_b = new Element('time_all', 30, 20);
                controlsObj.addElement('TimeAll', time_all_b);
                controls.appendChild(time_all_b.c);
                CSS(time_all_b.c, {
                    'cursor': 'default',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - time_all_b.h) / 2 + 3 + time_all_b.s.margintop * 1 - time_all_b.s.marginbottom * 1,
                    'white-space': 'nowrap'
                });
                cntrls[i] = time_all_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + time_all_b.s.marginleft + time_all_b.s.marginright;
                cntrli[i] = time_all_b;
                timeitems++
            }
            if (cntrl[i] == '|') {
                sep_b[sep] = new Element('separator', 5, 20);
                controlsObj.addElement('Separator', sep_b[sep]);
                controls.appendChild(sep_b[sep].c);
                CSS(sep_b[sep].c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - sep_b[sep].h) / 2 + sep_b[sep].s.margintop - sep_b[sep].s.marginbottom
                });
                cntrls[i] = sep_b[sep].w + vars.cntrlmargin;
                cntrlength += cntrls[i] + sep_b[sep].s.marginleft + sep_b[sep].s.marginright;
                cntrli[i] = sep_b[sep];
                sep++
            }
            if (cntrl[i] == 'run_line') {
                var run_s = Cntrl_Style('run');
                run_b = document.createElement('div');
                controlsObj.addDom('RunLine', run_b);
                controls.appendChild(run_b);
                var lh = vars.cntrlline['h'];
                if (vars.cntrl_line) {
                    if (vars.cntrl_line['h']) {
                        lh = vars.cntrl_line['h']
                    }
                }
                if (run_s['position'] == 0) {
                    if (lh % 2 != run_s['h'] % 2) {
                        run_s['h'] ++
                    }
                    if (run_s['o'] == 1) {
                        run_s['w'] = run_s['h']
                    }
                }
                CSS(run_b, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'left': 0,
                    'top': run_s['margintop'] * 1 - run_s['marginbottom'] * 1,
                    'width': run_s['w'] + 'px',
                    'height': run_s['h'] + 'px',
                    'borderRadius': (run_s['w'] * run_s['o']) + 'px',
                    'opacity(': run_s['alpha'],
                    'filter': 'alpha(opacity=' + (run_s['alpha'] * 100) + ')'
                });
                CheckGradiendDiv(run_b, run_s['color']);
                if (run_s['icon']) {
                    if (String(run_s['icon']).indexOf("http://") > -1) {
                        IconImg(run_s['icon'], run_b, 0, run_s['pic_w'], run_s['pic_h'], run_s['halficonisover'])
                    }
                }
                if (run_s['bg'] == 1) {
                    CSS(run_b, {
                        'border': '2px solid #' + ReColor(run_s['bgcolor'])
                    })
                }
                run_pos = run_s['position'];
                if (vars.tip == 1 && line_s['notip'] == 0) {
                    run_b.onmouseover = function() {
                        media.duration ? ToolTip(run_b, 'line') : ''
                    };
                    run_b.onmouseout = function() {
                        ToolTipHide(run_b)
                    }
                }
            }
            if (cntrl[i] == 'run_volume' && !mobile) {
                var run_s = Cntrl_Style('run_volume');
                runvolume_b = document.createElement('div');
                controlsObj.addDom('RunVolume', runvolume_b);
                controls.appendChild(runvolume_b);
                CSS(runvolume_b, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': run_s['w'] + 'px',
                    'height': run_s['h'] + 'px',
                    'borderRadius': (run_s['w'] * run_s['o']) + 'px',
                    'opacity': run_s['alpha'],
                    'filter': 'alpha(opacity=' + (run_s['alpha'] * 100) + ')'
                });
                CheckGradiendDiv(runvolume_b, run_s['color']);
                runvolume_pos = run_s['position'];
                if (vars.ivolbar_v) {
                    Hide(runvolume_b)
                }
                if (run_s['bg'] == 1) {
                    CSS(runvolume_b, {
                        'border': '2px solid #' + ReColor(run_s['bgcolor'])
                    })
                }
            }
            if (cntrl[i] == 'sound' && !mobile) {
                cntrl[i] = 'volume';
                vars.cntrl_volume = vars.cntrl_sound
            }
            if ((cntrl[i] == 'volume' || cntrl[i] == 'volbarline_v') && !mobile) {
                volume_b = new Element('volume', 20, 20);
                controlsObj.addElement('Volume', volume_b);
                controls.appendChild(volume_b.c);
                CSS(volume_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - volume_b.h) / 2 + volume_b.s.margintop - volume_b.s.marginbottom
                });
                volume_b.c.onclick = Mute;
                volume_mute_b = new Element('volume_mute', 20, 20, '', 'volume');
                controlsObj.addElement('VolumeMute', volume_mute_b);
                controls.appendChild(volume_mute_b.c);
                CSS(volume_mute_b.c, {
                    'display': 'none',
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - volume_mute_b.h) / 2 + volume_mute_b.s.margintop - volume_mute_b.s.marginbottom
                });
                cntrls[i] = volume_mute_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + volume_mute_b.s.marginleft + volume_mute_b.s.marginright;
                volume_mute_b.c.onclick = Mute;
                cntrli[i] = volume_b;
                vars.tip == 1 && volume_b.s.notip == 0 ? volume_b.c.title = (volume_b.s.tip ? volume_b.s.tip : vars.lang2['volume']) : '';
                if (cntrl[i] == 'volbarline_v') {
                    vars.ivolbar_v = true;
                    volbarline_b = document.createElement('div');
                    controlsObj.addDom('VolumeBarlineV', volbarline_b);
                    controls.appendChild(volbarline_b);
                    vars.cntrl_volbarline_v.bg = 0;
                    CSS(volbarline_b, {
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'top': 0
                    });
                    volbarline_s = Cntrl_Style('volbarline_v');
                    volbarline_all_b = document.createElement('div');
                    volbarline_b.appendChild(volbarline_all_b);
                    CSS(volbarline_all_b, {
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'left': 0,
                        'top': 0,
                        'width': volbarline_s['w'],
                        'height': volbarline_s['h'],
                        'borderRadius': ((volbarline_s['h'] / 2) * volbarline_s['o']) + 'px',
                        'opacity': volbarline_s['all_a'],
                        'filter': 'alpha(opacity=' + (volbarline_s['all_a'] * 100) + ')'
                    });
                    CheckGradiendDiv(volbarline_all_b, volbarline_s['color_all']);
                    volbarline_s['active'] = false;
                    CSS(volbarline_b, {
                        'display': 'none',
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'top': (vars.cntrloutheight - volbarline_s['h']) - 10
                    });
                    volbarline_play_b = document.createElement('div');
                    volbarline_b.appendChild(volbarline_play_b);
                    CSS(volbarline_play_b, {
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'left': 0,
                        'top': 0,
                        'width': volbarline_s['w'],
                        'height': volbarline_s['h'],
                        'borderRadius': ((volbarline_s['h'] / 2) * volbarline_s['o']) + 'px',
                        'opacity': volbarline_s['play_a'],
                        'filter': 'alpha(opacity=' + (volbarline_s['play_a'] * 100) + ')'
                    });
                    CheckGradiendDiv(volbarline_play_b, volbarline_s['color_play']);
                    CSS(volbarline_b, {
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'top': (-volbarline_s['h'])
                    });
                    CSS(volbarline_play_b, {
                        'height': volbarline_s['h'] * vars.volume,
                        'top': volbarline_s['h'] - volbarline_s['h'] * vars.volume
                    });
                    volbarline_b.onmousedown = function VolbarlineDown(e) {
                        volbarline_s['active'] = true;
                        if (!e) var e = window.event;
                        VolumeMove_v(e)
                    };
                    volbarline_b.onmousemove = function VolbarlineMove(e) {
                        if (!e) var e = window.event;
                        VolumeMove_v(e)
                    };
                    volbarline_b.onmouseup = function VolbarlineUp(e) {
                        volbarline_s['active'] = false
                    };
                    volbarline_b.onmouseover = function VolbarlineOver(e) {
                        volbarline_s['over'] = true
                    };
                    volbarline_b.onmouseout = function VolbarlineOut(e) {
                        volbarline_s['over'] = false
                    };
                    volume_mute_b.c.onmouseout = volume_b.c.onmouseover = function VolumeOver(e) {
                        CSS(volbarline_b, {
                            "display": "block"
                        });
                        if (runvolume_b) {
                            CSS(runvolume_b, {
                                "display": "block"
                            });
                            runvolume_b.style.zIndex = 8;
                            RunPos(runvolume_b, volbarline_b, volbarline_play_b, volbarline_all_b, runvolume_pos)
                        }
                        volbarline_s['over'] = true
                    };
                    volume_mute_b.c.onmouseover = volume_b.c.onmouseover = function VolumeOver(e) {
                        CSS(volbarline_b, {
                            "display": "block"
                        });
                        if (runvolume_b) {
                            CSS(runvolume_b, {
                                "display": "block"
                            });
                            runvolume_b.style.zIndex = 8;
                            RunPos(runvolume_b, volbarline_b, volbarline_play_b, volbarline_all_b, runvolume_pos)
                        }
                        volbarline_s['over'] = true
                    };
                    volume_mute_b.c.onmouseout = volume_b.c.onmouseout = VolbarHide;
                    volbarline_b.style.zIndex = 7;
                    if (runvolume_b) {
                        Hide(runvolume_b)
                    }
                }
            }
            if (cntrl[i] == 'tune' && !mobile) {
                cntrl[i] = 'volbarline';
                vars.cntrl_volbarline = vars.cntrl_tune
            }
            if (cntrl[i] == 'volbarline' && !mobile) {
                volbarline_b = document.createElement('div');
                controlsObj.addDom('VolumeBarline', volbarline_b);
                controls.appendChild(volbarline_b);
                volbarline_s = Cntrl_Style('volbarline');
                volbarline_all_b = document.createElement('div');
                volbarline_b.appendChild(volbarline_all_b);
                CSS(volbarline_all_b, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': volbarline_s['w'],
                    'height': volbarline_s['h'],
                    'borderRadius': ((volbarline_s['h'] / 2) * volbarline_s['o']) + 'px',
                    'opacity': volbarline_s['all_a'],
                    'filter': 'alpha(opacity=' + (volbarline_s['all_a'] * 100) + ')'
                });
                CheckGradiendDiv(volbarline_all_b, volbarline_s['color_all']);
                volbarline_s['active'] = false;
                volbarline_play_b = document.createElement('div');
                volbarline_b.appendChild(volbarline_play_b);
                CSS(volbarline_play_b, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'height': volbarline_s['h'],
                    'borderRadius': ((volbarline_s['h'] / 2) * volbarline_s['o']) + 'px',
                    'opacity': volbarline_s['play_a'],
                    'filter': 'alpha(opacity=' + (volbarline_s['play_a'] * 100) + ')'
                });
                CheckGradiendDiv(volbarline_play_b, volbarline_s['color_all']);
                CSS(volbarline_b, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - volbarline_s['h']) / 2 + volbarline_s['margintop'] - volbarline_s['marginbottom']
                });
                cntrls[i] = volbarline_s['w'] + vars.cntrlmargin + 5;
                cntrlength += cntrls[i] + volbarline_s['marginleft'] + volbarline_s['marginright'];
                CSS(volbarline_play_b, {
                    'width': volbarline_s['w'] * (v ? v : vars.volume)
                });
                volbarline_b.onmousedown = function(e) {
                    volbarline_s['active'] = true;
                    if (!e) var e = window.event;
                    VolumeMove(e)
                };
                volbarline_b.onmousemove = function(e) {
                    if (!e) var e = window.event;
                    VolumeMove(e)
                };
                volbarline_b.onmouseout = function(e) {
                    if (!e) var e = window.event;
                    VolumeOut(e)
                };
                volbarline_b.onmouseup = function(e) {
                    volbarline_s['active'] = false
                };
                cntrli[i] = volbarline_b
            }
            if (cntrl[i] == 'volbar' && !mobile) {
                volbar_b = document.createElement('div');
                controlsObj.addDom('VolumeBar', volbar_b);
                controls.appendChild(volbar_b);
                volbars = [];
                vars.cntrl_volbar.all_a ? vars.cntrlvolbar.all_a = vars.cntrl_volbar.all_a : '';
                vars.cntrl_volbar.play_a ? vars.cntrlvolbar.play_a = vars.cntrl_volbar.play_a : '';
                if (vars.cntrl_volbar.icon) {
                    if (vars.cntrl_volbar.icon == 1) {
                        vars.cntrlvolbar.n = 10;
                        vars.cntrlvolbar.bar = 1
                    }
                    if (vars.cntrl_volbar.icon == 2) {
                        vars.cntrlvolbar.n = 5;
                        vars.cntrlvolbar.bar = 0
                    }
                    if (vars.cntrl_volbar.icon == 3) {
                        vars.cntrlvolbar.n = 10;
                        vars.cntrlvolbar.bar = 0
                    }
                }
                vars.cntrl_volbar.n ? vars.cntrlvolbar.n = vars.cntrl_volbar.n : '';
                vars.cntrl_volbar.bar ? vars.cntrlvolbar.bar = vars.cntrl_volbar.bar : '';
                vars.cntrl_volbar.scale ? vars.cntrlvolbar.scale = vars.cntrl_volbar.scale : '';
                vars.cntrl_volbar.margintop ? vars.cntrlvolbar.margintop = vars.cntrl_volbar.margintop : vars.cntrlvolbar.margintop = 0;
                vars.cntrl_volbar.marginbottom ? vars.cntrlvolbar.marginbottom = vars.cntrl_volbar.marginbottom : vars.cntrlvolbar.marginbottom = 0;
                vars.cntrlvolbar.w = vars.cntrlvolbar.n * 5 * vars.cntrlvolbar.scale;
                vars.cntrlvolbar.h = 10 * vars.cntrlvolbar.scale;
                for (vb = 0; vb < vars.cntrlvolbar.n; vb++) {
                    var vbh = (vars.cntrlvolbar.bar == 1 ? (10 / vars.cntrlvolbar.n) * (vb + 1) : 10 * vars.cntrlvolbar.scale);
                    volbars[vb] = new Element('volbar', 3 * vars.cntrlvolbar.scale, vbh);
                    volbar_b.appendChild(volbars[vb].c);
                    CSS(volbars[vb].c, {
                        'position': 'absolute',
                        'top': 10 * vars.cntrlvolbar.scale - vbh * vars.cntrlvolbar.scale,
                        'left': vb * 5 * vars.cntrlvolbar.scale + 10 * (vars.cntrlvolbar.scale - 1),
                        'opacity': vars.cntrlvolbar.all_a
                    });
                    if (vars.cntrl_volbar.bar == 1) {
                        volbars[vb].c.onmouseover = function(e) {
                            CSS(this, {
                                'top': vbh - 1
                            })
                        };
                        volbars[vb].c.onmouseout = function(e) {
                            CSS(this, {
                                'top': vbh
                            })
                        }
                    }
                };
                volbar_b.onmousedown = function(e) {
                    volbar_b.active = true;
                    if (!e) var e = window.event;
                    VolbarMove(e)
                };
                volbar_b.onmousemove = function(e) {
                    if (!e) var e = window.event;
                    VolbarMove(e)
                };
                volbar_b.onmouseup = function(e) {
                    volbar_b.active = false
                };
                CSS(volbar_b, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - vars.cntrlvolbar.h) / 2 + (vars.cntrlvolbar.h - 10) * vars.cntrlvolbar.scale + vars.cntrlvolbar.margintop - vars.cntrlvolbar.marginbottom,
                    'width': vars.cntrlvolbar.w,
                    'height': vars.cntrlvolbar.h
                });
                cntrls[i] = (vars.cntrlvolbar.n + 1) * 5 + vars.cntrlmargin;
                cntrlength += cntrls[i] + (vars.cntrlvolbar.marginleft ? vars.cntrlvolbar.marginleft : 0) + (vars.cntrlvolbar.marginright ? vars.cntrlvolbar.marginright : 0);
                cntrli[i] = volbar_b;
                v != 0 ? VolumeDraw(-v) : ''
            }
            if (cntrl[i] == 'full') {
                controlsObj.add(new Uppod.EnterFullscreenControl(uppod));
                controlsObj.add(new Uppod.ExitFullscreenControl(uppod));
                full_b = uppod.controls().EnterFullscreen.options.element;
                full_back_b = uppod.controls().ExitFullscreen.options.element;
                cntrls[i] = full_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + full_b.s.marginleft + full_b.s.marginright;
                cntrli[i] = full_b
            }
            if (cntrl[i] == 'sub') {
                sub_b = new Element('sub', 20, 20);
                controlsObj.addElement('Sub', sub_b);
                controls.appendChild(sub_b.c);
                CSS(sub_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - sub_b.h) / 2 + sub_b.s.margintop - sub_b.s.marginbottom
                });
                sub_b.c.onclick = SetSub;
                cntrls[i] = sub_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + sub_b.s.marginleft + sub_b.s.marginright;
                cntrli[i] = sub_b;
                if (vars.tip == 1 && sub_b.s.notip == 0) {
                    sub_b.c.onmouseover = function() {
                        ToolTip(sub_b.c, sub_b.s.tip ? sub_b.s.tip : vars.lang2['sub'])
                    };
                    sub_b.c.onmouseout = function() {
                        ToolTipHide(sub_b.c)
                    }
                }
            }
            if (cntrl[i] == 'hd') {
                if (vars.youtube) {
                    vars.hdlinks = 'hd720,large,medium,small';
                    vars.hd = '720p,480p,320p,240p';
                    vars.hdsw == 60 ? vars.hdsw = 55 : ''
                }
                if (vars.hd) {
                    if (vars.hd.indexOf('::') > -1) {
                        hd_b = new Element('hd', 20, 20);
                        controlsObj.addElement('Hd', hd_b);
                        controls.appendChild(hd_b.c);
                        CSS(hd_b.c, {
                            'cursor': 'pointer',
                            'display': (vars.hd1 == 1 ? 'none' : 'block'),
                            'position': 'absolute',
                            'top': Math.floor((vars.cntrloutheight - hd_b.h) / 2 + hd_b.s.margintop - hd_b.s.marginbottom)
                        });
                        if (hd_b.s.icon2) {
                            if (hd_b.s.icon == hd_b.s.icon2) {
                                CSS(hd_b.c, {
                                    'opacity': hd_b.s.alpha0
                                })
                            }
                        }
                        cntrls[i] = hd_b.w + vars.cntrlmargin;
                        hd_b.c.onclick = Quality;
                        cntrlength += cntrls[i] + hd_b.s.marginleft + hd_b.s.marginright;
                        cntrli[i] = hd_b;
                        if (vars.tip == 1 && hd_b.s.notip == 0) {
                            hd_b.c.onmouseover = function() {
                                ToolTip(hd_b.c, hd_b.s.tip ? hd_b.s.tip : vars.lang2['hd'])
                            };
                            hd_b.c.onmouseout = function() {
                                ToolTipHide(hd_b.c)
                            }
                        }
                        hd1_b = new Element('hd1', 20, 20, '', 'hd');
                        controlsObj.addElement('Hd1', hd1_b);
                        controls.appendChild(hd1_b.c);
                        CSS(hd1_b.c, {
                            'cursor': 'pointer',
                            'display': (vars.hd1 == 1 ? 'block' : 'none'),
                            'position': 'absolute',
                            'top': Math.floor((vars.cntrloutheight - hd1_b.h) / 2 + hd1_b.s.margintop - hd1_b.s.marginbottom)
                        });
                        hd1_b.c.onclick = Quality;
                        if (vars.tip == 1 && hd1_b.s.notip == 0) {
                            hd1_b.c.onmouseover = function() {
                                ToolTip(hd1_b.c, hd_b.s.tip_off ? hd_b.s.tip_off : vars.lang2['hd'])
                            };
                            hd1_b.c.onmouseout = function() {
                                ToolTipHide(hd1_b.c)
                            }
                        }
                    } else {
                        if (vars.hd.indexOf(',') > -1) {
                            vars.hda = vars.hd.split(',');
                            if (vars.hdsw == 60) {
                                vars.hdsw = 0;
                                for (var h = 0; h < vars.hda.length; h++) {
                                    vars.hdsw < measureText(vars.hda[h], 12).width ? vars.hdsw = measureText(vars.hda[h], 12).width : ''
                                }
                                vars.hdsw += 22
                            }
                            hd_b = new Element('hdselect', vars.hdsw, 20, '', 'hd');
                            controlsObj.addElement('HdSelect', hd_b);
                            controls.appendChild(hd_b.c);
                            CSS(hd_b.c, {
                                'cursor': 'pointer',
                                'position': 'absolute',
                                'top': Math.floor((vars.cntrloutheight - hd_b.h) / 2 + hd_b.s.margintop - hd_b.s.marginbottom)
                            });
                            cntrls[i] = hd_b.w + vars.cntrlmargin;
                            hd_b.c.onclick = Quality;
                            cntrlength += cntrls[i] + hd_b.s.marginleft + hd_b.s.marginright;
                            cntrli[i] = hd_b;
                            vars.tip == 1 && hd_b.s.notip == 0 ? hd_b.c.title = (hd_b.s.tip ? hd_b.s.tip : vars.lang2['hd']) : '';
                            hdselect = document.createElement('select');
                            hd_b.c.appendChild(hdselect);
                            HdSelect();
                            CSS(hdselect, {
                                'position': 'absolute',
                                'margin': '1px 0px 0px -5px',
                                'opacity': 0,
                                'cursor': 'pointer'
                            });
                            hdselect.onchange = QualitySelecter
                        }
                    }
                }
            }
            if (cntrl[i] == 'playlist') {
                if (vars.pl != '') {
                    playlist_b = new Element('playlist', 20, 20);
                    controlsObj.addElement('Playlist', playlist_b);
                    controls.appendChild(playlist_b.c);
                    CSS(playlist_b.c, {
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'top': (vars.cntrloutheight - playlist_b.h) / 2 + playlist_b.s.margintop - playlist_b.s.marginbottom
                    });
                    playlist_b.c.onclick = Pl;
                    cntrls[i] = playlist_b.w + vars.cntrlmargin;
                    cntrlength += cntrls[i] + playlist_b.s.marginleft + playlist_b.s.marginright;
                    cntrli[i] = playlist_b;
                    if (vars.tip == 1 && playlist_b.s.notip == 0) {
                        playlist_b.c.onmouseover = function() {
                            ToolTip(playlist_b.c, playlist_b.s.tip ? playlist_b.s.tip : vars.lang2['list'])
                        };
                        playlist_b.c.onmouseout = function() {
                            ToolTipHide(playlist_b.c)
                        }
                    }
                }
            }
            if (cntrl[i] == 'menu') {
                menu_b = new Element('menu', 20, 20);
                controlsObj.addElement('Menu', menu_b);
                controls.appendChild(menu_b.c);
                CSS(menu_b.c, {
                    'cursor': 'pointer',
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - menu_b.h) / 2 + menu_b.s.margintop - menu_b.s.marginbottom
                });
                menu_b.c.onclick = Menu;
                cntrls[i] = menu_b.w + vars.cntrlmargin;
                cntrlength += cntrls[i] + menu_b.s.marginleft + menu_b.s.marginright;
                cntrli[i] = menu_b;
                if (vars.tip == 1 && menu_b.s.notip == 0) {
                    menu_b.c.onmouseover = function() {
                        ToolTip(menu_b.c, menu_b.s.tip ? menu_b.s.tip : vars.lang2['menu'])
                    };
                    menu_b.c.onmouseout = function() {
                        ToolTipHide(menu_b.c)
                    }
                }
            }
            if (cntrl[i] == 'buffer') {
                if (line_b) {
                    buffer_b = new Element('buffer', 30, 14);
                    controlsObj.addElement('Buffer', buffer_b);
                    controls.appendChild(buffer_b.c);
                    CSS(buffer_b.c, {
                        'cursor': 'default',
                        'position': 'absolute',
                        'white-space': 'nowrap'
                    });
                    cntrli[i] = buffer_b;
                    cntrls[i] = 0;
                    buffer_b.c.innerHTML = vars.lang2['loading']
                }
            }
            if (cntrl[i] == 'start') {
                if (v.m == 'video' && nativecontrols) {} else {
                    start_b = new Element('start', 20, 20);
                    controlsObj.addElement('Start', start_b);
                    body.c.appendChild(start_b.c);
                    CSS(start_b.c, {
                        'cursor': 'pointer',
                        'position': 'absolute',
                        'top': (vars.ph) / 2 - start_b.h / 2,
                        'left': (vars.sw) / 2 - start_b.w / 2 - (start_b.s.pic_w > 0 ? start_b.s.pic_w / (start_b.s.halficonisover == 1 ? 4 : 2) : 0),
                        'zIndex': 7
                    });
                    start_b.c.onclick = Toggle;
                    start_b.c.style.zIndex = 7
                }
            }
            if (cntrl[i] == 'space') {
                space_b = document.createElement('div');
                controlsObj.addDom('Space', space_b);
                controls.appendChild(space_b);
                CSS(space_b, {
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - 20) / 2
                });
                cntrli[i] = space_b
            }
            if (cntrl[i] == 'line') {
                iline = true;
                line_b = document.createElement('div');
                controlsObj.addDom('Line', line_b);
                controls.appendChild(line_b);
                line_s = Cntrl_Style('line');
                line_all_b = document.createElement('div');
                line_b.appendChild(line_all_b);
                CSS(line_all_b, {
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': '100%',
                    'height': line_s['h'],
                    'borderRadius': ((line_s['h'] / 2) * line_s['o']) + 'px',
                    'opacity': line_s['all_a'],
                    'filter': 'alpha(opacity=' + (line_s['all_a'] * 100) + ')'
                });
                CheckGradiendDiv(line_all_b, line_s['color_all']);
                line_load_b = document.createElement('div');
                line_b.appendChild(line_load_b);
                CSS(line_load_b, {
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': '100%',
                    'height': line_s['h'],
                    'backgroundColor': '#' + ReColor(line_s['color_load']),
                    'borderRadius': ((line_s['h'] / 2) * line_s['o']) + 'px',
                    'opacity': line_s['load_a'],
                    'filter': 'alpha(opacity=' + (line_s['load_a'] * 100) + ')'
                });
                CheckGradiendDiv(line_load_b, line_s['color_load']);
                line_play_b = document.createElement('div');
                line_b.appendChild(line_play_b);
                CSS(line_play_b, {
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': '100%',
                    'height': line_s['h'],
                    'backgroundColor': '#' + ReColor(line_s['color_play']),
                    'borderRadius': ((line_s['h'] / 2) * line_s['o']) + 'px',
                    'opacity': line_s['play_a'],
                    'filter': 'alpha(opacity=' + (line_s['play_a'] * 100) + ')'
                });
                CheckGradiendDiv(line_play_b, line_s['color_play']);
                CSS(line_b, {
                    'position': 'absolute',
                    'top': (vars.cntrloutheight - line_s['h']) / 2 + line_s['margintop'] * 1 - line_s['marginbottom'] * 1,
                    'cursor': 'pointer'
                });
                CSS(line_play_b, {
                    'width': '0'
                });
                CSS(line_load_b, {
                    'width': '0'
                });
                line_s['active'] = false;
                line_but_b = document.createElement('div');
                controlsObj.addDom('LineBtn', line_but_b);
                controls.appendChild(line_but_b);
                CSS(line_but_b, {
                    'position': 'absolute',
                    'height': (line_s['h'] < 10 ? 20 : line_s['h'] * 2),
                    'cursor': 'pointer'
                });
                line_but_b.onmousedown = function(e) {
                    Uppod.trace('line_but_b.onmousedown');
                    if (!istart) {
                        Toggle()
                    }
                    line_s['active'] = true;
                    if (!e) var e = window.event
                };
                line_but_b.onmouseup = function(e) {
                    Uppod.trace('line_but_b.onmouseup');
                    if (istart) {
                        SeekMove(e);
                        line_s['active'] = false
                    }
                };
                if (vars.tip == 1 && line_s['notip'] == 0) {
                    line_but_b.onmouseover = function() {
                        ToolTip(line_but_b, 'line')
                    };
                    line_but_b.onmouseout = function() {
                        ToolTipHide(line_but_b)
                    }
                }
                cntrli[i] = line_b
            }
        }
        time_all_b && vars.time > 0 ? time_all_b.c.innerHTML = formatTime(vars.time) : '';
        PlaceControls()
    }

    function CntrlBg() {
        if (uibg) {
            Remove('uibg')
        }
        if (vars.cntrlout != 1 && vars.cntrlbg == 1) {
            vars.cntrlbgcolor.indexOf('|') == -1 ? vars.cntrlbgcolor = vars.cntrlbgcolor + '|' + vars.cntrlbgcolor : '';
            uibg = new Shaper2({
                w: vars.scrn_w,
                h: vars.cntrloutheight,
                onotop: (vars.cntrloutheight == vars.h ? 0 : 1),
                bgc: vars.cntrlbgcolor,
                bga1: vars.cntrlbgalpha1,
                bga2: vars.cntrlbgalpha2,
                o: (vars.padding > 0 ? vars.o / 2 : vars.cntrlbgo)
            })
        }
        if (vars.cntrlout == 1 && vars.padding == 0) {
            vars.cntrlbgcolor.indexOf('|') == -1 ? vars.cntrlbgcolor = vars.cntrlbgcolor + '|' + vars.cntrlbgcolor : '';
            uibg = new Shaper2({
                w: vars.scrn_w,
                h: vars.cntrloutheight,
                o: vars.o / 2 - vars.padding,
                onotop: (vars.cntrloutheight == vars.h ? 0 : 1),
                bgc: vars.bodycolor,
                bga1: 1,
                bga2: 1,
                o: (vars.padding > 0 ? vars.o / 2 : vars.cntrlbgo)
            })
        }
        if (uibg) {
            uibg.c.setAttribute('id', 'uibg');
            controls.appendChild(uibg.c);
            if (vars.glass == 1) {
                uibg_gl = new Shaper2({
                    w: vars.scrn_w,
                    h: vars.cntrloutheight / 2,
                    o: vars.o / 2 - vars.padding,
                    bgc: (vars.glasscolor.indexOf('|') == -1 ? vars.glasscolor + '|' + vars.glasscolor : vars.glasscolor),
                    bga1: vars.glassalpha1,
                    bga2: vars.glassalpha2
                });
                uibg.c.appendChild(uibg_gl.c);
                CSS(uibg_gl.canvas, {
                    "position": "absolute",
                    "top": 0,
                    "left": 0,
                    "height": vars.cntrloutheight / 2,
                    "width": vars.scrn_w
                })
            }
        }
    }

    function PlaceControls() {
        var line_w = vars.sw - cntrlength - vars.cntrlendmargin * 2 - vars.cntrlmargin * 2 - (!ifull ? vars.padding * 2 : 0) - vars.cntrlmarginleft - vars.cntrlmarginright - (timelength - 4) * 4 * timeitems;
        var cntrl_x = vars.cntrlendmargin + vars.cntrlmarginleft;
        var marginleft;
        var marginright;
        for (i = 0; i < cntrl.length; i++) {
            if (cntrli[i]) {
                marginleft = 0;
                marginright = 0;
                if (cntrli[i].s) {
                    marginleft = parseInt(cntrli[i].s.marginleft);
                    marginright = parseInt(cntrli[i].s.marginright)
                }
                if (cntrl[i] == 'volbarline') {
                    marginleft = (vars.cntrl_volbarline.marginleft ? vars.cntrl_volbarline.marginleft : 0);
                    marginright = (vars.cntrl_volbarline.marginright ? vars.cntrl_volbarline.marginright : 0)
                }
                cntrl_x += marginleft;
                if (cntrli[i] != line_b && cntrli[i] != space_b) {
                    CSS((cntrli[i].c != undefined ? cntrli[i].c : cntrli[i]), {
                        'left': cntrl_x
                    });
                    if (cntrl[i] == 'play' || cntrl[i] == 'playstop') {
                        CSS(pause_b.c, {
                            'left': cntrl_x
                        })
                    }
                    if (cntrl[i] == 'full') {
                        CSS(full_back_b.c, {
                            'left': cntrl_x
                        })
                    }
                    if (cntrl[i] == 'hd') {
                        hd1_b ? CSS(hd1_b.c, {
                            'left': cntrl_x
                        }) : ''
                    }
                    if (cntrl[i] == 'volume' || cntrl[i] == 'volbarline_v') {
                        CSS(volume_mute_b.c, {
                            'left': cntrl_x,
                            'opacity': (volume_mute_b.s.icon == 2 ? 0.5 : 1)
                        })
                    }
                    if (cntrl[i] == 'volbarline_v') {
                        CSS(volbarline_b, {
                            'left': cntrl_x + volume_b.w / 2 - volbarline_s['w'] / 2
                        })
                    }
                    if (cntrl[i].indexOf('time') > -1) {
                        cntrl_x += (timelength - 4) * 4 + (vars.cntrlmargin - 5)
                    }
                    cntrl_x += Math.floor(cntrls[i] + marginright)
                } else {
                    if (cntrli[i] == line_b) {
                        if (vars.cntrl_line.full == 1) {
                            CSS(line_b, {
                                'left': (vars.cntrl_line.marginleft ? vars.cntrl_line.marginleft : 0),
                                'top': (vars.cntrloutheight) / 2 + line_all_b.h - (vars.cntrl_line.marginbottom ? vars.cntrl_line.marginbottom : 0) + (vars.cntrl_line.margintop ? vars.cntrl_line.margintop : 0)
                            });
                            line_all_b.w = vars.sw - (vars.cntrl_line.marginleft ? vars.cntrl_line.marginleft : 0) - (vars.cntrl_line.marginright ? vars.cntrl_line.marginright : 0);
                            line_play_b.w = line_all_b.w;
                            line_load_b.w = line_all_b.w;
                            CSS(line_all_b, {
                                'width': '' + line_all_b.w + 'px'
                            })
                        } else {
                            CSS(line_b, {
                                'left': cntrl_x + 3 + (vars.cntrl_line.marginleft ? vars.cntrl_line.marginleft : 0)
                            });
                            line_all_b.w = line_w;
                            line_play_b.w = line_w;
                            line_load_b.w = line_w;
                            CSS(line_all_b, {
                                'width': '' + line_w + 'px'
                            });
                            cntrls[i] = line_w;
                            cntrl_x += Math.floor(cntrls[i] + vars.cntrlmargin + 6 + (vars.cntrl_line.marginright ? vars.cntrl_line.marginright : 0) + (vars.cntrl_line.marginleft ? vars.cntrl_line.marginleft : 0))
                        }
                        CSS(line_but_b, {
                            'width': line_all_b.w + 'px',
                            'position': 'absolute',
                            'top': (parseInt(line_b.style.top) + line_s.h / 2 - parseInt(line_but_b.style.height) / 2),
                            'left': line_b.style.left,
                            'cursor': 'pointer'
                        })
                    }
                    if (cntrli[i] == space_b) {
                        CSS(space_b, {
                            'left': cntrl_x + 3,
                            'width': '' + line_w + 'px'
                        });
                        cntrls[i] = line_w;
                        cntrl_x += Math.floor(cntrls[i] + vars.cntrlmargin + 6)
                    }
                }
                if (buffer_b) {
                    CSS(buffer_b.c, {
                        'left': line_b.offsetLeft
                    });
                    CSS(buffer_b.c, {
                        'top': line_b.offsetTop - 10
                    })
                }
            }
        }
        line_b && run_b ? RunPos(run_b, line_b, line_play_b, line_all_b, run_pos) : '';
        if (volbarline_b && runvolume_b) {
            RunPos(runvolume_b, volbarline_b, volbarline_play_b, volbarline_all_b, runvolume_pos)
        }
    }

    function RunPos(run, line, line_play, line_all, pos) {
        if (run == runvolume_b && vars.ivolbar_v) {
            var rl = (-line_play.offsetHeight) - (pos > 0 ? run.offsetHeight : run.offsetHeight / 2);
            rl < line.offsetTop ? rl = line.offsetTop : '';
            rl > 0 + run.offsetHeight ? rl = run.offsetHeight : '';
            CSS(run, {
                'top': rl + 'px',
                'left': '' + (line.offsetLeft + line_all.offsetWidth / 2 - run.offsetWidth / 2 - (pos == '1' ? run.offsetWidth / 2 + line_all.offsetWidth / 2 : 0) + (pos == '2' ? run.offsetWidth / 2 + line_all.offsetWidth / 2 : 0)) + 'px'
            })
        } else {
            var rl = (line_play.offsetWidth + line.offsetLeft) - (pos > 0 ? run.offsetWidth : run.offsetWidth / 2);
            rl < line.offsetLeft ? rl = line.offsetLeft : '';
            rl > line.offsetLeft + line_all.offsetWidth - run.offsetWidth ? rl = line.offsetLeft + line_all.offsetWidth - run.offsetWidth : '';
            CSS(run, {
                'left': rl + 'px',
                'top': '' + (line_all.offsetTop + line.offsetTop + line_all.offsetHeight / 2 - run.offsetHeight / 2 - (pos == '1' ? run.offsetHeight / 2 + line_all.offsetHeight / 2 : 0) + (pos == '2' ? run.offsetHeight / 2 + line_all.offsetHeight / 2 : 0) + (vars.cntrl_run['margintop'] ? vars.cntrl_run['margintop'] * 1 : "") - (vars.cntrl_run['marginbottom'] ? vars.cntrl_run['marginbottom'] * 1 : "")) + 'px'
            })
        }
    }

    function Cntrl_Style(st) {
        var s = [];
        for (var key in vars.cntrlstyle) {
            s[key] = vars.cntrlstyle[key]
        }
        for (var key in vars['cntrl' + st]) {
            s[key] = vars['cntrl' + st][key]
        }
        for (var key in vars['cntrl_' + st]) {
            s[key] = vars['cntrl_' + st][key]
        }
        return s
    }

    function findLeft(obj) {
        var curleft = 0;
        if (obj.offsetParent) {
            curleft = obj.offsetLeft;
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
            }
        }
        return curleft
    }

    function findTop(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            curtop = obj.offsetTop;
            while (obj = obj.offsetParent) {
                curtop += obj.offsetTop
            }
        }
        return curtop
    }

    function VolbarHide() {
        volbarline_s['over'] = false;
        setTimeout(VolbarHideProcess, 1000)
    }

    function VolbarHideProcess() {
        if (!volbarline_s['over']) {
            CSS(volbarline_b, {
                "display": "none"
            });
            if (runvolume_b) {
                CSS(runvolume_b, {
                    "display": "none"
                })
            }
        } else {
            setTimeout(VolbarHideProcess, 1000)
        }
    }

    function VolumeMove(e) {
        if (volbarline_s['active']) {
            if (!e) var e = window.event;
            var clickX = e.pageX - findLeft(volbarline_b);
            Volume(clickX)
        }
    }

    function VolumeOut(e) {
        if (volbarline_s['active']) {
            if (!e) var e = window.event;
            var clickX = e.pageX - findLeft(volbarline_b);
            if (clickX >= volbarline_s['w']) {
                volbarline_s['active'] = false
            }
        }
    }

    function VolumeMove_v(e) {
        if (volbarline_s['active'] && vars.ivolbar_v) {
            if (!e) var e = window.event;
            var clickY = e.pageY - findTop(volbarline_b);
            Volume(volbarline_s['h'] - clickY)
        }
    }

    function VolbarMove(e) {
        if (volbar_b.active) {
            if (!e) var e = window.event;
            var clickX = e.pageX - findLeft(volbar_b);
            Volume(clickX)
        }
    }

    function Volume(n) {
        var v = VolumeDraw(n);
        VolumeN(v)
    }

    function VolumeDraw(n) {
        if (volbarline_play_b) {
            if (vars.ivolbar_v) {
                n > 0 ? v = Math.max(0, Math.min(1, (n) / volbarline_s['h'])) : v = -n;
                CSS(volbarline_play_b, {
                    'height': '' + volbarline_s['h'] * v + 'px',
                    'top': volbarline_s['h'] - volbarline_s['h'] * v
                })
            } else {
                n > 0 ? v = Math.max(0, Math.min(1, (n) / volbarline_s['w'])) : v = -n;
                CSS(volbarline_play_b, {
                    'width': '' + (volbarline_s['w'] * v) + 'px'
                })
            }
        }
        if (volbar_b) {
            for (vb = 0; vb < volbars.length; vb++) {
                n > 0 ? v = Math.max(0, Math.min(1, (n) / vars.cntrlvolbar.w)) : v = -n;
                if (vb < Math.ceil(volbars.length * v)) {
                    CSS(volbars[vb].c, {
                        "opacity": vars.cntrlvolbar.play_a
                    })
                } else {
                    CSS(volbars[vb].c, {
                        "opacity": vars.cntrlvolbar.all_a
                    })
                }
            }
        }
        volbarline_b && runvolume_b ? RunPos(runvolume_b, volbarline_b, volbarline_play_b, volbarline_all_b, runvolume_pos) : '';
        return v
    }

    function VolumeN(v) {
        if (muted && v > 0) {
            Mute()
        }
        v > 0 ? muted = false : muted = true;
        if (isYoutube()) {
            media_yt.setVolume(v * 100)
        } else {
            media.volume = v;
            media ? media.muted = false : ''
        }
        MuteControl();
        document.cookie = "uppodhtml5_volume=" + v + "; path=/; expires=Mon, 01-Jan-2099 00:00:00 GMT"
    }

    function SeekMove(e) {
        var clickX = e.pageX - findLeft(line_b);
        Uppod.trace('SeekMove clickX = ' + clickX);
        if (line_s['active']) {
            if (!e) var e = window.event;
            Seek(clickX)
        }
    }

    function Seek(cursorX) {
        Uppod.trace('Seek cursorX = ' + cursorX);
        if (iline) {
            var percent = Math.max(0, Math.min(1, (cursorX) / line_all_b.w))
        } else {
            var percent = 0
        }
        if (isYoutube()) {
            media_yt.seekTo(percent * media_yt.getDuration())
        } else {
            if (media && media.duration) {
                SeekTime(percent * media.duration)
            }
        }
        StopSub()
    }

    function SeekTime(t) {
        Uppod.trace('SeekTime to ' + t);
        if (media) {
            if (media.duration) {
                media.currentTime = t
            }
        }
    }

    function IconImg() {
        return Uppod.IconImg.apply(this, arguments)
    }

    function CheckBase64() {
        return Uppod.CheckBase64.apply(this, arguments)
    }

    function CSS() {
        return Uppod.setStyle.apply(this, arguments)
    }

    function destroyCanvases() {
        for (var i = 0; i < canvasObjs.length; i++) {
            var canvasObj = canvasObjs[i];
            if (canvasObj) {
                canvasObj.canvas = null
            }
        }
    }
    this.destroy = function() {
        if (uppod.ads()) {
            uppod.ads().destroy()
        }
        if (isYoutube()) {
            media_yt.destroy()
        } else {
            DestroyMedia()
        }
        elems = uppod.document.querySelectorAll('*');
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem)
            }
        }
        destroyCanvases();
        if (uppod.iframe.parentNode) {
            uppod.iframe.parentNode.removeChild(uppod.iframe)
        }
    };
    this.getStatus = function() {
        return !istart ? 0 : (ibuff ? 3 : (iplay ? 1 : 2))
    };
    this.Play = function(s) {
        if (s) {
            ClearOldVars();
            NewFile(s, true)
        } else {
            !iplay ? Toggle() : ''
        }
    };
    this.Init = function(s) {
        Init()
    };
    this.Pause = function() {
        iplay ? Toggle() : ''
    };
    this.Toggle = function() {
        Toggle()
    };
    this.Stop = function() {
        init ? Stop() : ''
    };
    this.Seek = function(s) {
        init ? SeekTime(s) : ''
    };
    this.Download = function() {
        init ? Download() : ''
    };
    this.Resize = function() {
        Resize()
    };
    this.Alert = function(s) {
        Alert(s, true)
    };
    this.Full = function(s) {
        Full()
    };
    this.Comment = function(s) {
        Alert(s, false)
    };
    this.CurrentTime = function() {
        if (init && media) {
            return CurrentTime()
        } else {
            return -1
        }
    };
    this.PlNumber = function() {
        if (pl) {
            return parseInt(ipl) + 1
        } else {
            return -1
        }
    };
    this.PlayPlNumber = function(s) {
        if (pl) {
            PlClick0();
            ipl = parseInt(s) - (vars.pl[0].playlist == "back" ? 0 : 1);
            PlClickCont()
        }
    };
    this.Duration = function() {
        if (init && media) {
            return Duration()
        } else {
            return -1
        }
    };
    this.Volume = function(s) {
        VolumeN(s)
    };
    this.Played = function() {
        if (init && media) {
            return Math.round((CurrentTime() / media.duration) * 100)
        } else {
            return -1
        }
    };
    this.Change = function(k, v) {
        vars[k] = v;
        Layer();
        CntrlBg()
    };
    this.Get = function(k) {
        return vars[k]
    };
    this.ChangeColor = function(k, v) {
        vars[k] = v;
        if (k == 'screencolor') {
            var ctx = scrn.canvas.getContext("2d");
            ctx.fillStyle = v;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    };
    this.EventDetail = function(s) {
        return vars.events[s]
    };
    this.YoutubeInit = function() {
        YoutubeInit()
    };
    this.currentTime = this.CurrentTime;
    this.seek = this.Seek;
    this.play = this.Play;
    this.toogleFullscreen = this.Full;

    function YoutubeInit() {
        if (vars.youtube && vars.youtube_id) {
            youtubeElemId = 'yt_media_' + vars.uid;
            media = document.createElement('div');
            media.setAttribute('id', youtubeElemId);
            media_mc.appendChild(media);
            media_yt = new uppod.window.YT.Player(youtubeElemId, {
                height: vars.scrn_h,
                width: vars.scrn_w,
                videoId: vars.youtube_id,
                playerVars: {
                    enablejsapi: 1,
                    html5: 1,
                    iv_load_policy: 3,
                    playerapiid: youtubeElemId,
                    disablekb: 1,
                    controls: browser.restrictMediaPlay ? 1 : 0,
                    showinfo: 0,
                    modestbranding: 1,
                    rel: 0,
                    autoplay: 0,
                    loop: 0
                },
                events: {
                    'onReady': YoutubePlayerReady,
                    'onError': YoutubeError,
                    'onPlaybackQualityChange': YoutubeQualityChanged,
                    'onStateChange': YoutubePlayerStateChange
                }
            });
            layer ? Hide(layer) : ''
        }
    }

    function isYoutubeApiLoaded() {
        if (uppod.window['YT']) {
            return true
        } else {
            return false
        }
    }

    function isYoutube() {
        return vars.youtube && media_yt ? true : false
    }

    function YoutubePlayerReady() {
        onReady();
        checkStart();
        youtubeIframe = uppod.document.querySelector('#' + youtubeElemId);
        if (vars.auto == 'play' && !mobile) {
            Play();
            media_yt.playVideo()
        }
    }

    function YoutubeError(e) {
        if (e) {
            NotFound()
        }
    }

    function YoutubeQualityChanged() {}

    function YoutubeQuality() {
        var q = media_yt.getAvailableQualityLevels();
        vars.hdlinks = q;
        var q2 = [];
        for (var i = 0; i < q.length; i++) {
            switch (q[i]) {
                case 'tiny':
                    q2[i] = '144p';
                    break;
                case 'small':
                    q2[i] = '240p';
                    break;
                case 'medium':
                    q2[i] = '320p';
                    break;
                case 'large':
                    q2[i] = '480p';
                    break;
                case 'hd720':
                    q2[i] = '720p';
                    break;
                case 'hd1080':
                    q2[i] = '1080p';
                    break;
                case 'highres':
                    q2[i] = 'High';
                    break;
                default:
                    q2[i] = q[i]
            }
        }
        vars.hda = q2;
        HdSelect()
    }

    function YoutubePlayerStateChange() {
        var state = media_yt.getPlayerState();
        if (state == 1 && !vars.youtube_quality_received && hd_b) {
            YoutubeQuality();
            vars.youtube_quality_received = true
        };
        if (state == uppod.window.YT.PlayerState.PLAYING) {
            OnPlay()
        };
        if (state == uppod.window.YT.PlayerState.PAUSED) {
            OnPause()
        }
        if (state == uppod.window.YT.PlayerState.ENDED) {
            OnEnded()
        }
    }

    function disableSelection(target) {
        if (typeof target.onselectstart != "undefined") {
            target.onselectstart = function() {
                return false
            }
        } else if (typeof target.style.MozUserSelect != "undefined") {
            target.style.MozUserSelect = "none"
        } else {
            target.onmousedown = function() {
                return false
            };
            target.style.cursor = "default"
        }
    }

    function SelectRework(v, b) {
        b.ctx.clearRect(0, 0, 200, 200);
        b.ctx.fillText(v, 5 * b.s.scale, 15 * b.s.scale);
        b.ctx.beginPath();
        b.ctx.moveTo((b.canvas.width - 10) * b.s.scale, 9 * b.s.scale);
        b.ctx.lineTo((b.canvas.width - 6) * b.s.scale, 9 * b.s.scale);
        b.ctx.lineTo((b.canvas.width - 8) * b.s.scale, 14 * b.s.scale);
        b.ctx.lineTo((b.canvas.width - 10) * b.s.scale, 9 * b.s.scale);
        b.ctx.closePath();
        b.ctx.lineWidth = 0.1;
        b.ctx.stroke();
        b.ctx.fill()
    }

    function Element(nm, bw, bh, nm2, st) {
        var args = [vars].concat(Array.prototype.slice.call(arguments, 0));
        Uppod.Element.apply(this, args);
        canvasObjs.push(this)
    };

    function Shaper2(v) {
        Uppod.Shaper2.call(this, v);
        canvasObjs.push(this)
    };

    function setVarsDefaults() {
        this.uid;
        this.sid;
        this.auto = 'firstframe';
        this.alerts = 1;
        this.addcontrols = '';
        this.airplay = 1;
        this.bgcolor = 'ffffff';
        this.bodycolor = '000000';
        this.brd = 0;
        this.brdcolor = 'cccccc';
        this.buffersec = 5;
        this.cntrlbg = 1;
        this.cntrlbgcolor = '000000|000000';
        this.cntrlbgalpha1 = .15;
        this.cntrlbgalpha2 = .7;
        this.cntrlbgo = 0;
        this.cntrlendmargin = 7;
        this.cntrlhide = 0;
        this.fullcntrlhide = 1;
        this.cntrlmargin = 3;
        this.cntrlmarginright = 0;
        this.cntrlmarginleft = 0;
        this.cntrlout = 0;
        this.cntrloutheight = 35;
        this.cntrlsize = 1;
        this.cntrlcolor = 'ffffff';
        this.cntrlbuffer = {
            "center": 0
        };
        this.cntrl_buffer = {};
        this.cntrlfull = {
            "out": 0
        };
        this.cntrl_full = {};
        this.cntrlstyle = {
            "icon": 0,
            "color": "ffffff",
            "bg": 0,
            "bg_o": 1,
            "bg_smallicon": 1,
            "bgcolor": "000000",
            "bg_sh": "0",
            "bg_in": "0",
            "bg_gl": "0",
            "gl_a1": .9,
            "gl_a2": .1,
            "gl_color": "FFFFFF",
            "sh_blur": 6,
            "sh_dist": 0,
            "bg_a": 1,
            "bg_w": 20,
            "bg_h": 20,
            "scale": 1,
            "eff": 0,
            "effE": "Cubic",
            "sh": 0,
            "sh_c": "000000",
            "sh_a": 0.5,
            "sh_under": 1,
            "notip": 0,
            "text": 0,
            "center": 0,
            "marginleft": 0,
            "marginright": 0,
            "margintop": 0,
            "marginbottom": 0,
            "alpha": 1
        };
        this.cntrlplay = {};
        this.cntrl_play = {};
        this.cntrlpause = {};
        this.cntrl_pause = {};
        this.cntrlstop = {};
        this.cntrl_stop = {};
        this.cntrldownload = {};
        this.cntrl_download = {};
        this.cntrlnext = {};
        this.cntrl_next = {};
        this.cntrlprev = {};
        this.cntrl_prev = {};
        this.cntrlline = {
            "h": 4,
            "all_a": 0.3,
            "load_a": 0.4,
            "play_a": 1,
            "click": 1,
            "color_play": "ffffff",
            "color_all": "ffffff",
            "color_load": "ffffff",
            "o": 0,
            "full": 0
        };
        this.cntrl_line = {};
        this.cntrl_volbarline = {};
        this.cntrlvolbarline = {
            "h": 4,
            "w": 40,
            "all_a": 0.4,
            "play_a": 1,
            "color_play": "ffffff",
            "color_all": "ffffff",
            "o": 0
        };
        this.cntrl_volbarline_v = {};
        this.cntrlvolbarline_v = {
            "h": 50,
            "w": 4,
            "bg": 0,
            "bgcolor": "000000",
            "bg_o": 0,
            "bg_a": .15,
            "all_a": 0.4,
            "play_a": 1,
            "effdir": 0,
            "color_play": "ffffff",
            "color_all": "ffffff",
            "o": 0
        };
        this.ivolbar_v = false;
        this.cntrlvolbar = {
            "bar": 1,
            "n": 5,
            "all_a": 0.4,
            "play_a": 1,
            "scale": 1
        };
        this.cntrl_volbar = {};
        this.cntrl_tune = {};
        this.cntrl_volume = {};
        this.cntrlvolume = {};
        this.cntrl_sound = {};
        this.cntrlmenu = {};
        this.cntrl_menu = {};
        this.cntrlplaylist = {};
        this.cntrl_playlist = {};
        this.cntrl_hd = {};
        this.cntrlhd = {
            "icon": "HQ",
            "text": 1,
            "alpha0": 0.5,
            "w": 60
        };
        this.cntrlhdselect = {
            "bg": 1,
            "bg_o": 10,
            "bg_a": 0.7,
            "bgcolor": "666666|000000",
            "bg_smallicon": 0
        };
        this.cntrl_sub = {};
        this.cntrlsub = {
            "icon": "A",
            "alpha0": 0.5,
            "text": 1
        };
        this.cntrlsize = 1;
        this.cntrlstart = {
            "bg": 1,
            "bg_sh": 1,
            "bgcolor": "ffffff",
            "bg_a": .1,
            "bg_w": 75,
            "bg_h": 75,
            "gl_a1": .8,
            "gl_a2": 0,
            "eff": 1,
            "scale2": 2,
            "curtain": "0",
            "curtainColor": "000000",
            "curtainAlpha": 0.5,
            "notip": 1,
            "bg_smallicon": 0
        };
        this.cntrl_start = {};
        this.cntrlseparator = {
            "alpha": 0.5
        };
        this.cntrl_separator = {};
        this.cntrlrun = {
            "w": 7,
            "h": 7,
            "o": 1,
            "position": 0,
            "hide": 0
        };
        this.cntrl_run = {};
        this.cntrlrun_volume = {
            "w": 7,
            "h": 7,
            "o": 1,
            "position": 0,
            "hide": 0
        };
        this.cntrl_run_volume = {};
        this.glass = 0;
        this.glasscolor = 'ffffff';
        this.glassalpha1 = 0.9;
        this.glassalpha2 = 0.2;
        this.hd;
        this.hdsw = 60;
        this.hda;
        this.hdlinks;
        this.hdseparator = ',';
        this.quality = '';
        this.hd1 = 0;
        this.comment = "";
        this.title;
        this.showname = 0;
        this.showtitle;
        this.shownameliketip = 0;
        this.shownameonover = 0;
        this.shownameonstop = 0;
        this.stageposition = '';
        this.stageleft = 0;
        this.stagetop = 0;
        this.commentcolor = "ffffff";
        this.commentbgcolor = "000000";
        this.commentbgcolor_k = false;
        this.commentbgalpha1 = 0.5;
        this.commentbgalpha2 = 0.1;
        this.commentalign = "left";
        this.commenttopmargin = 0;
        this.commentmargin = 10;
        this.tipfontcolor = "ffffff";
        this.tipfont = 'Verdana';
        this.tipfontsize = 10;
        this.tipbgcolor = "000000";
        this.tipalpha = 0.7;
        this.tipbgo = 8;
        this.tipbgshadow = 0;
        this.tiptags1 = '';
        this.tiptags2 = '';
        this.tipcenter = 1;
        this.marquee = 0;
        this.controls = '';
        this.videocontrols = "play,back,time_play,line,time_all,volume,volbarline,full,buffer";
        this.audiocontrols = "play,back,time_play,line,time_all,volume,volbarline,buffer";
        this.streamcontrols = "play,time_play,volume,volbarline";
        this.download = '';
        this.embedcode = '';
        this.events = new Array();
        this.eventtime = 0;
        this.eventplayed = 0;
        this.iosplayer = 0;
        this.androidplayer = 0;
        this.file = '';
        this.filehd = '';
        this.or = [];
        this.ori = 0;
        this.hotkey = 1;
        this.youtube = false;
        this.youtube_created = false;
        this.youtube_quality_received = false;
        this.htmlsize = 0;
        this.id = '';
        this.iframe = '';
        this.iframeurl = '';
        this.plr = '';
        this.pl_history = [];
        this.bottomrowheight = 200;
        this.pl_rows = 0;
        this.link = '';
        this.m = 'video';
        this.menu_nocode = 0;
        this.menu_h = 0;
        this.menu_w = 0;
        this.menuauto = 0;
        this.namefont = 'Verdana';
        this.namefontsize = 11;
        this.namefontstyle = 'normal';
        this.namebgalpha = 0;
        this.namebgcolor = '000000';
        this.namebgo = 8;
        this.namebgshadow = 0;
        this.namecolor = 'ffffff';
        this.namemargin_h = 0;
        this.namemargin_v = 0;
        this.namepadding = 6;
        this.nameleading = 0;
        this.nametopanel = 0;
        this.nametags1 = '';
        this.nametags2 = '';
        this.logo = '';
        this.logoplace = 2;
        this.logoalpha = 0.5;
        this.logomargin = 15;
        this.logomargin_h = 15;
        this.logomargin_v = 15;
        this.logolink = '';
        this.logotarget = '_self';
        this.referer = location.href;
        this.redirect = '';
        this.nohtml5 = 'uppod.swf';
        this.o = 0;
        this.padding = 0;
        this.poster = '';
        this.pl = '';
        this.plplace = "inside";
        this.pltw = 100;
        this.plth = 70;
        this.plcolor = 'ffffff';
        this.plcolor2 = 'ffffff';
        this.plbgcolor = '000000';
        this.plalpha = 0.3;
        this.plalpha2 = 0.1;
        this.plalpha_play = 0.8;
        this.plmargin = 0;
        this.plmargin_h = 10;
        this.plmargin_v = 0;
        this.pltags1 = '';
        this.pltags2 = '';
        this.plfont = 'Arial';
        this.plfontsize = 11;
        this.plplay = 0;
        this.plplay1 = 1;
        this.pliview = 0;
        this.plrows = 0;
        this.plcenter = 0;
        this.plbgcolor_play;
        this.plcolor_play;
        this.pltumbs = 0;
        this.fillposter = 1;
        this.random = 0;
        this.time = 0;
        this.download;
        this.radio = 0;
        this.radiodropcache = 0;
        this.reloader = 0;
        this.reloadercounter = 0;
        this.reloadertime = 0;
        this.screencolor = '000000';
        this.screenposter = '';
        this.scrn_w = 0;
        this.scrn_h = 0;
        this.start = 0;
        this.subcolor = 'FAED54';
        this.subbgcolor = '000000';
        this.subfont = 'sans-serif';
        this.subbgalpha = 1;
        this.subbgo = 8;
        this.subbgshadow = 0;
        this.subsize = 100;
        this.substart = 1;
        this.subtop = 0;
        this.sub_shift = 0;
        this.submargin = 0;
        this.sublangs;
        this.sublangsall = 0;
        this.sublang;
        this.remsublang = 1;
        this.transparent = 0;
        this.keyseek = 10;
        this.volume = 0.8;
        this.w = 500;
        this.webkitFullscreen = 0;
        this.realfullscreen = 1;
        this.h = 375;
        this.st = ''
    }

    function setVarsLang() {
        this.lang = 'ru';
        this.lang_ru = {
            "lang": "ru",
            "localization": {
                "back": "В начало",
                "play": "Пуск",
                "pause": "Пауза",
                "stop": "Стоп",
                "full": "Развернуть",
                "full_back": "Свернуть",
                "list": "Плейлист",
                "next": "Следующий",
                "download": "Скачать",
                "prev": "Предыдущий",
                "sound_off": "Вкл. звук",
                "sound": "Выкл. звук",
                "volume": "Громкость",
                "menu": "Поделиться",
                "menu_code": "Код",
                "menu_link": "Ссылка",
                "menu_download": "Файл",
                "menu_copy": "Скопировать",
                "menu_mail": "Ссылку на e-mail",
                "sent": "Отправлено",
                "menu_message": "Текст",
                "menu_send": "Отправить",
                "fontsize": "Размер",
                "bgalpha": "Фон",
                "fontcolor": "Цвет текста",
                "off": "Выключить",
                "on": "Включить",
                "hq": "Лучшее качество",
                "hd": "Качество",
                "hq_off": "Обычное качество",
                "sub": "Субтитры",
                "traffic": "Трафик (МБ)",
                "smoothing": "Включить сглаживание",
                "smoothing_off": "Выключить сглаживание",
                "smoothing_ok": "Сглаживание включено",
                "smoothing_off_ok": "Сглаживание выключено",
                "password": "Пароль",
                "startlive": "Начать трансляцию",
                "live": "Трансляция",
                "rec": "Запись",
                "rerec": "Заново",
                "playrec": "Играть",
                "contrec": "Продолжить запись",
                "settings": "Настройки",
                "done": "Готово",
                "shownotes": "Шоуноты",
                "loading": "Загрузка",
                "startplay": "Включите плеер",
                "notype": "Не указан режим плеера (m)",
                "err": "Ошибка",
                "errjson": "Ошибка загрузки",
                "errjson_decode": "Ошибка в",
                "errjsonpl_decode": "Ошибка в плейлисте",
                "err_pl": "Ошибка загрузки плейлиста",
                "err_img": "Ошибка загрузки изображения",
                "file": "Файл",
                "notfound": "не найден",
                "copy_link": "Ссылка скопирована в буфер обмена",
                "copy_code": "Код скопирован в буфер обмена",
                "no_data": "Нет данных",
                "ads": "Реклама",
                "like": "Понравилось",
                "like": "Мне нравится",
                "unlike": "Не нравится",
                "all": "Все"
            }
        };
        this.lang_en = {
            "lang": "en",
            "localization": {
                "back": "Back",
                "play": "Play",
                "pause": "Pause",
                "stop": "Stop",
                "full": "Fullscreen",
                "full_back": "Original",
                "list": "Playlist",
                "next": "Next",
                "download": "Download",
                "prev": "Previous",
                "sound_off": "On",
                "sound": "Off",
                "volume": "Volume",
                "menu": "Share",
                "menu_code": "Code",
                "menu_link": "Link",
                "menu_download": "File",
                "menu_copy": "Copy",
                "menu_mail": "Email to a Friend",
                "sent": "Sent",
                "menu_message": "Text",
                "menu_send": "Send",
                "fontsize": "Size",
                "bgalpha": "BG",
                "fontcolor": "Text color",
                "off": "Switch off",
                "on": "Switch on",
                "hq": "High quality",
                "hd": "Quality",
                "hq_off": "Low quality",
                "sub": "Subtitles",
                "traffic": "Traffic (MB)",
                "smoothing": "Enable smoothing",
                "smoothing_off": "Disable smoothing",
                "smoothing_ok": "Smoothing on",
                "smoothing_off_ok": "Smoothing off",
                "password": "Password",
                "startlive": "Start broadcast",
                "live": "Broadcast",
                "rec": "Record",
                "rerec": "Re-record",
                "playrec": "Play",
                "contrec": "Сontinue record",
                "settings": "Settings",
                "done": "Done",
                "shownotes": "Shownotes",
                "loading": "Loading",
                "startplay": "Turn on the player",
                "notype": "No player mode (m)",
                "err": "Error",
                "errjson": "Error loading",
                "errjson_decode": "Incorrect",
                "errjsonpl_decode": "Incorrect playlist",
                "err_pl": "Error loading playlist",
                "err_img": "Error loading image",
                "file": "File",
                "notfound": "not found",
                "streamnotfound": "Stream not found",
                "fileinvalid": "File structure is invalid",
                "copy_link": "Link is copied to clipboard",
                "copy_code": "Code is copied to clipboard",
                "no_data": "No data",
                "ads": "Ad",
                "like": "Like",
                "unlike": "Unlike",
                "all": "All"
            }
        };
        this.lang2 = this.lang_ru.localization
    }

    function loadStyle() {
        var str = '';
        if (this.st != '') {
            if (this.st.indexOf('{') == -1) {
                if (this.st.indexOf('#') == 0) {
                    str = un(this.st)
                } else {
                    if (this.st.indexOf('.') == -1) {
                        try {
                            var est = eval(this.st)
                        } catch (err) {
                            ierr = Filename(this.st) + ' ' + this.lang2.notfound
                        }
                        if (est != '') {
                            str = est;
                            if (str != '') {
                                if (str.indexOf('#') == 0) {
                                    str = un(str)
                                }
                            }
                        } else {
                            ierr = Filename(this.st) + ' ' + this.lang2.notfound
                        }
                    } else {
                        str = LoadFile(this.st)
                    }
                }
            } else {
                str = this.st
            }
            if (str != '') {
                style = JSON.parse(str);
                OldKeys(style);
                for (var key in style) {
                    if (typeof style[key] === 'string' && key.indexOf('color') > -1) {
                        style[key] = style[key].replace('#', '');
                        style[key].length == 5 ? style[key] = '0' + style[key] : '';
                        if (style[key].indexOf('|') > 0) {
                            style[key] = ReColor(style[key].substr(0, style[key].indexOf('|'))) + '|' + ReColor(style[key].substr(style[key].indexOf('|') + 1))
                        } else {
                            style[key] = ReColor(style[key])
                        }
                    }
                    this[key] = style[key]
                }
                if (style['controls']) {
                    isetcontrols = true
                }
            }
        }
    }

    function manageStgSize() {
        var widthPx = getCss(this.stg, 'width').indexOf('px') > 0;
        var width = parseInt(getCss(this.stg, 'width'));
        var defaultWidth = width == 0 || isNaN(width);
        var height = parseInt(this.stg.style.height);
        if (isNaN(height)) {
            height = parseInt(getCss(this.stg, 'height'))
        }
        var heightPx = getCss(this.stg, 'height').indexOf('px') > 0;
        var defaultHeight = height == 0 || isNaN(height);
        if (!defaultWidth && widthPx) {
            this.w = width
        }
        if (!defaultWidth && !widthPx) {
            if (this.stg.parentNode.offsetWidth > 0) {
                this.w = this.stg.parentNode.offsetWidth * width / 100
            } else {
                defaultWidth = true
            }
        }
        if (defaultWidth) {
            this.stg.style.width = this.w + 'px'
        }
        if (!defaultHeight && heightPx) {
            this.h = height
        }
        if (!defaultHeight && !heightPx) {
            if (this.stg.parentNode.offsetHeight > 0) {
                this.h = this.stg.parentNode.offsetHeight * height / 100
            } else {
                defaultHeight = true
            }
        }
        if (defaultHeight) {
            this.stg.style.height = this.h + 'px'
        }
        this.sh = this.stageheight = this.h;
        this.ph = this.sh;
        this.sw = this.stagewidth = this.w;
        this.pw = this.sw
    }

    function Vars() {
        setVarsDefaults.call(this);
        this.stg = uppod._parentDom = document.getElementById(loadvars.id);
        if (this.stg == null) {
            alert('Uppod: ID (' + loadvars.id + ') not found')
        }
        this.sw = this.stagewidth = this.stg.offsetWidth;
        this.sh = this.stageheight = this.stg.offsetHeight;
        this.ph = this.sh;
        this.pw = this.sw;
        this.touch = 0;
        setVarsLang.call(this);
        OldKeys(loadvars);
        var isetcontrols = false;
        if (uppodstyle != "") {
            this.st = uppodstyle
        }
        if (this.st0) {
            for (var key in this.st0) {
                this[key] = this.st0[key]
            }
        }
        for (var key in loadvars) {
            this[key] = loadvars[key]
        }
        manageStgSize.call(this);
        if (loadvars['video']) {
            this.m = 'video';
            this.file = loadvars['video']
        }
        if (loadvars['audio']) {
            this.m = 'audio';
            this.file = loadvars['audio']
        }
        loadvars['controls'] ? isetcontrols = true : '';
        if (this.m == 'audio') {
            this.cntrlhide = 0;
            this.fullcntrlhide = 0;
            this.showname = 1;
            this.shownameliketip = 1;
            this.controls == '' ? this.controls = this.audiocontrols : '';
            this.uibg = 0;
            nativecontrols = false
        } else {
            this.controls == '' ? this.controls = this.videocontrols : ''
        }
        loadStyle.call(this);
        if (android) {
            if (!chrome) {
                this.androidplayer = 1
            }
            if (this.m == 'video' && this.androidplayer == 1) {
                nativecontrols = true
            }
            if (this.auto == "play") {
                this.auto = "firstframe"
            }
        }
        if (ipad) {
            if (this.m == 'video') {
                if (this.iosplayer == 1) {
                    nativecontrols = true
                } else {
                    nativecontrols = false
                }
            }
            if (this.auto == "none" || this.auto == "play") {
                this.auto = "firstframe"
            }
        }
        if (ipad && this.plplace == "inside" && (this.controls.indexOf("pl,") > -1 || this.controls.indexOf(",pl") == this.controls.length - 3)) {
            this.plplace = 'bottom'
        }
        if (this.sh == 0) {
            if (this.w == 500 && this.h == 375 && this.m == 'audio') {
                this.w = 300;
                this.h = 90
            }
            CSS(this.stg, {
                'width': this.w + 'px',
                'height': this.h + 'px'
            });
            this.sw = this.stagewidth = this.w;
            this.sh = this.stageheight = this.h
        }
        if (this.poster.indexOf('#') == 0) {
            this.poster = un(this.poster)
        }
        if (this.file) {
            if (this.file.indexOf('#') == 0) {
                this.file = un(this.file)
            }
        }
        if (this.title) {
            this.comment = this.title
        }
        if (this.cntrlcolor) {
            this.cntrlstyle["color"] = this.cntrlcolor;
            this.cntrlline["color_play"] = this.cntrlcolor;
            this.cntrlline["color_all"] = this.cntrlcolor;
            this.cntrlline["color_load"] = this.cntrlcolor;
            this.cntrlvolbarline["color_play"] = this.cntrlcolor;
            this.cntrlvolbarline["color_all"] = this.cntrlcolor;
            this.cntrlvolbarline_v["color_play"] = this.cntrlcolor;
            this.cntrlvolbarline_v["color_all"] = this.cntrlcolor
        }
        this.dots = [74, 105, 82, 100, 78, 85, 106, 110, 122, 69, 102, 80, 97, 99, 84, 79, 87, 104, 101, 103, 65, 109, 76, 68, 120, 108, 90, 81, 118, 114, 121, 75, 89, 86, 66, 107, 71, 116, 112, 113, 111, 67, 115, 88, 72, 83, 98, 77, 70, 73, 119, 117, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47, 61];
        if (this.showtitle) {
            this.showname = this.showtitle
        }
        if (this.pl != null && typeof(this.pl) === "object") {
            this.pl = this.pl["playlist"]
        } else {
            if (this.pl.indexOf('#') == 0) {
                this.pl = un(this.pl)
            }
        }
        this.lang2 = this.lang_ru.localization;
        if (this.lang == 'en') {
            this.lang2 = this.lang_en.localization
        }
        this.h = this.sh;
        if (this.plplace != 'inside' && this.plplace != 'bottomrow' && this.plplace != 'bottom') {
            this.plplace = 'inside';
            if (this.controls.indexOf('playlist') == -1) {
                this.controls += ',playlist'
            }
        }
        if (this.plplace == 'inside') {
            if (this.pl != '' && !isetcontrols && this.controls.indexOf('playlist') == -1) {
                this.controls += ',playlist'
            }
        }
        if (this.plplace == 'bottomrow') {
            this.plth == 70 ? this.plth = 40 : '';
            this.pltw = this.sw - this.plmargin * 2;
            this.pl != '' ? this.h = this.sh - this.bottomrowheight - 20 : ''
        }
        if (this.plplace == 'bottom') {
            this.pl != '' ? this.h = this.sh - this.plth - 20 : ''
        }
        if (this.plplace == 'bottomrow' || this.plplace == 'bottom') {
            if (this.controls.indexOf('playlist') > -1) {
                this.controls = this.controls.replace(',playlist', '')
            }
        }
        if (this.nametags1 != '') {
            if (this.nametags1.indexOf("size=") > -1) {
                this.namefontsize = this.nametags1.substr(this.nametags1.indexOf("size=") + 6, 2);
                this.namefontsize = this.namefontsize.replace(/\//g, "")
            }
        }
        if (this.radio == 1 && this.controls == this.audiocontrols) {
            this.controls = this.streamcontrols;
            defaultcontrols = true
        }
        var list = '';
        for (var i = 0; i < this.dots.length; ++i) list += String.fromCharCode(this.dots[i]);
        if (this.no_w) {
            this.w = this.no_w
        }
        if (this.no_h) {
            this.h = this.no_h
        }
        this.cntrlmargin += 2;
        if (this.htmlsize == 1) {
            this.w = this.sw;
            this.h = this.sh
        }
        if (this.plplace != "inside") {
            this.ph = this.h
        }
        if (this.lang == 'ru') {
            this.lang2 = this.lang_ru.localization
        }
        if (this.addcontrols) {
            this.controls += ',' + this.addcontrols
        }
        if (this.plr) {
            this.iframe = this.plr
        }
        if (this.subsize != 100) {
            this.subsize < 30 ? this.subsize = 100 + (this.subsize - 13) * 10 : ''
        }
        this.config = {
            _keyStr: list,
            uploader: function(e) {
                var t = "";
                var n, r, i, s, o, u, a;
                var f = 0;
                e = vars.config._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = (n & 3) << 4 | r >> 4;
                    u = (r & 15) << 2 | i >> 6;
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64
                    } else if (isNaN(i)) {
                        a = 64
                    }
                    t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                }
                return t
            },
            loader: function(e) {
                var t = "";
                var n, r, i;
                var s, o, u, a;
                var f = 0;
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = s << 2 | o >> 4;
                    r = (o & 15) << 4 | u >> 2;
                    i = (u & 3) << 6 | a;
                    t = t + String.fromCharCode(n);
                    if (u != 64) {
                        t = t + String.fromCharCode(r)
                    }
                    if (a != 64) {
                        t = t + String.fromCharCode(i)
                    }
                }
                t = vars.config._utf8_decode(t);
                eval(t)
            },
            _utf8_encode: function(e) {
                e = e.replace(/\r\n/g, "\n");
                var t = "";
                for (var n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r)
                    } else if (r > 127 && r < 2048) {
                        t += String.fromCharCode(r >> 6 | 192);
                        t += String.fromCharCode(r & 63 | 128)
                    } else {
                        t += String.fromCharCode(r >> 12 | 224);
                        t += String.fromCharCode(r >> 6 & 63 | 128);
                        t += String.fromCharCode(r & 63 | 128)
                    }
                }
                return t
            },
            _utf8_decode: function(e) {
                var t = "";
                var n = 0;
                var r = c1 = c2 = 0;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3
                    }
                }
                return t
            }
        };
        getCookie('volume') && this.volume == 0.8 ? v = getCookie('volume') : v = this.volume
    }

    function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " uppodhtml5_" + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(";", offset);
                if (end == -1) {
                    end = cookie.length
                }
                setStr = unescape(cookie.substring(offset, end))
            }
        }
        return (setStr)
    }

    function OldKeys(ar) {
        for (var key in ar) {
            if (key.indexOf('pltumbs0') == 0) {
                ar[key.replace("pltumbs0", "pl")] = ar[key]
            }
            if (key.indexOf('pl0') == 0) {
                ar[key.replace("pl0", "pl")] = ar[key]
            }
            if (key.indexOf('plcomment') == 0) {
                ar[key.replace("plcomment", "pl")] = ar[key]
            }
        }
    }

    function un(s) {
        if (s.indexOf('.') == -1) {
            s = s.substr(1);
            s2 = '';
            for (i = 0; i < s.length; i += 3) {
                s2 += '%u0' + s.slice(i, i + 3)
            }
            s = unescape(s2)
        }
        return s
    }

    function getCss(elem, property) {
        return window.getComputedStyle(elem, null).getPropertyValue(property)
    }

    function Opacity(elem, o) {
        CSS(elem, {
            "opacity": o,
            "filter": "alpha(opacity=" + (o * 100) + ")"
        })
    }

    function CheckGradiendDiv(mc, c) {
        if (c.indexOf('|') > 0) {
            var c2 = c.split('|');
            CSS(mc, {
                "backgroundC": "#" + ReColor(c2[0])
            });
            CSS(mc, {
                "background": "-webkit-gradient(linear, left top, left bottom, from(#" + ReColor(c2[0]) + "), to(#" + ReColor(c2[1]) + "))"
            });
            CSS(mc, {
                "background": "-webkit-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
            });
            CSS(mc, {
                "background": "-moz-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
            });
            CSS(mc, {
                "background": "-ms-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
            });
            CSS(mc, {
                "background": "-o-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
            });
            CSS(mc, {
                "background-image": "-ms-linear-gradient(top, #" + ReColor(c2[0]) + " 0%, #" + ReColor(c2[1]) + " 100%)"
            })
        } else {
            CSS(mc, {
                'backgroundColor': '#' + ReColor(c)
            })
        }
    }

    function measureText() {
        return Uppod.measureText.apply(this, arguments)
    }

    function Filename(str) {
        if (str.indexOf('/') > 0) {
            str = str.substr(str.lastIndexOf('/') + 1)
        }
        return str
    }

    function LoadFile(url) {
        if (url) {
            req = new XMLHttpRequest();
            req.open("GET", url + (url.indexOf('?') > 0 ? '&' : '?') + Math.random(), false);
            try {
                req.send(null);
                if (req.status == 200) {
                    return req.responseText
                } else {
                    Alert(req.status)
                }
            } catch (err) {
                vars ? Alert(vars.lang2.errjson + ' ' + Filename(url), true) : ''
            }
        }
    }

    function Remove(id) {
        var elem = uppod.document.getElementById(id);
        elem ? elem.parentNode.removeChild(elem) : ''
    }
    var tip_margin_y = 10;
    var ie = document.all && !window.opera;
    var ns6 = document.getElementById && !document.all;

    function ToolTip(el, txt) {
        if (txt != '') {
            if (!tip.parentNode) {
                uppod.document.body.appendChild(tip)
            }
            tip.innerHTML = txt;
            op = 0.1;
            tip.style.opacity = op;
            tip.style.visibility = "visible";
            el.onmousemove = positiontip;
            showtip()
        }
    }

    function ToolTipHide(el) {
        tip.style.visibility = 'hidden';
        el.onmousemove = ''
    }

    function showtip() {
        if (op < vars.tipalpha) {
            op += 0.1;
            tip.style.opacity = op;
            tip.style.filter = 'alpha(opacity=' + op * 100 + ')';
            t = setTimeout(showtip, 30)
        }
    }

    function positiontip(e) {
        var iline = false;
        if (e.target == line_but_b || e.target == run_b) {
            iline = true;
            var duration;
            if (isYoutube()) {
                try {
                    duration = media_yt.getDuration()
                } catch (error) {}
            } else {
                duration = media.duration
            }
            if (duration) {
                var x = e.pageX;
                var l = findLeft(line_b);
                if (x > l) {
                    tip.innerHTML = formatTime((((x - l) / line_all_b.offsetWidth) * duration), true)
                } else {
                    tip.innerHTML = ''
                }
            } else {
                tip.innerHTML = ''
            }
        }
        var curX = e.pageX;
        var curY = e.pageY;
        var winwidth = uppod.window.innerWidth - 20;
        var winheight = uppod.window.innerHeight - 20;
        var rightedge = winwidth - e.clientX;
        var bottomedge = winheight - e.clientY - tip_margin_y;
        var left = 0;
        var top = 0;
        if (rightedge < tip.offsetWidth) left = curX - tip.offsetWidth + "px";
        else left = curX - (iline ? tip.offsetWidth / 2 : 0) + "px";
        if ((bottomedge < tip.offsetHeight) || iline) {
            top = curY - tip.offsetHeight - tip_margin_y + "px"
        } else {
            top = curY + tip_margin_y * 2 + "px"
        }
        CSS(tip, {
            'position': 'absolute',
            'top': top,
            'left': left
        })
    }
}
Uppod.attr = function(targetObj, name, options) {
    Object.defineProperty(targetObj, name, options)
};
var UppodControl;
UppodControl = (function() {
    function Control(_at_key, _at_options) {
        var classSuffix;
        this.key = _at_key;
        this.options = _at_options;
        if (this.options.dom) {
            this.dom = this.options.dom
        } else {
            this.dom = this.options.element.selfDom
        }
        classSuffix = this.key.replace(/([A-Z])/g, function($1) {
            return "_" + ($1.toLowerCase())
        });
        this.dom.className = "uppod-control" + classSuffix
    }
    Control.prototype.key = '';
    Control.prototype.options = {};
    Control.prototype.dom = {};
    Control.prototype.css = function(dataObj) {
        return Uppod.setStyle(this.dom, dataObj)
    };
    Control.prototype.activate = function() {
        this.dom.style.display = this._beforeDeactivate;
        return this._beforeDeactivate = null
    };
    Control.prototype.deactivate = function() {
        if (!this._beforeDeactivate) {
            this._beforeDeactivate = this.dom.style.display
        }
        return this.hide()
    };
    Control.prototype.show = function() {
        return this.dom.style.display = 'block'
    };
    Control.prototype.hide = function() {
        return this.dom.style.display = 'none'
    };
    Control.prototype._beforeDeactivate = null;
    return Control
})();

window.Uppod.Control = UppodControl;

var MediaW, __bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments)
    }
};

MediaW = (function() {
    function MediaW(_at_options) {
        this.options = _at_options;
        this._onSourceError = __bind(this._onSourceError, this);
        this._onVideoError = __bind(this._onVideoError, this);
        this._onEnded = __bind(this._onEnded, this);
        this._onPlayProcess = __bind(this._onPlayProcess, this);
        this._onPlaying = __bind(this._onPlaying, this);
        this._onPlay = __bind(this._onPlay, this);
        this._onPause = __bind(this._onPause, this);
        this._onError = __bind(this._onError, this);
        this._isPreroll = __bind(this._isPreroll, this);
        this.onError = new Uppod.Event();
        this.onPlayProcess = new Uppod.Event();
        this.onEnded = new Uppod.Event();
        this.dom = document.createElement(this.options.mode);
        this.dom.className = 'uppod-media';
        this.dom.addEventListener('error', this._onVideoError);
        this.dom.addEventListener('ended', this._onEnded);
        this.dom.addEventListener('play', this._onPlay);
        this.dom.addEventListener('pause', this._onPause);
        this.dom.addEventListener('playing', this._onPlaying);
        if (Uppod.browser.forceNativePlayBtn && this._isPreroll()) {
            this.dom.style.visibility = 'hidden'
        }
    }
    MediaW.prototype.dom = null;
    MediaW.prototype.options = null;
    MediaW.prototype.sources = null;
    MediaW.prototype.onError = 'Uppod.Event';
    MediaW.prototype.onEnded = 'Uppod.Event';
    MediaW.prototype.onPlayProcess = 'Uppod.Event';
    MediaW.TICK_SEC = 0.1;
    MediaW.prototype.setSources = function(filesStr) {
        Uppod.trace("MediaW#setSources filesStr=" + filesStr);
        this._onErrorOnce = false;
        if (filesStr.indexOf('|') > 0) {
            this.sources = filesStr.split('|')
        } else if (filesStr !== '') {
            this.sources = [filesStr]
        } else {
            this.sources = []
        }
        return this._createSourcesDom()
    };
    MediaW.prototype.play = function() {
        if (this.options.ads) {
            this.options.ads.unlockPlay()
        }
        if (this._isPreroll()) {
            return this.options.ads.playPreroll()
        } else {
            return this.dom.play()
        }
    };
    MediaW.prototype.pause = function() {
        this.dom.pause();
        if (this.options.ads && this.options.ads.isPauseroll) {
            return this.options.ads.playPauseroll()
        }
    };
    MediaW.prototype.destroy = function() {
        clearInterval(this._intervalPlayProcess);
        this.dom.removeEventListener('error', this._onVideoError);
        this.dom.removeEventListener('ended', this._onEnded);
        this.dom.removeEventListener('pause', this._onPause);
        this.dom.removeEventListener('playing', this._onPlaying);
        return this._destroySourcesDom()
    };
    MediaW.prototype._sourcesDom = [];
    MediaW.prototype._okSources = [];
    MediaW.prototype._onErrorOnce = false;
    MediaW.prototype._intervalPlayProcess = -1;
    MediaW.prototype._isPreroll = function() {
        return this.options.ads && this.options.ads.isPreroll
    };
    MediaW.prototype._createSourcesDom = function() {
        var sourceDom, src, _i, _len, _ref, _results;
        this._sourcesDom = [];
        this._okSources = [];
        _ref = this.sources;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            src = _ref[_i];
            sourceDom = document.createElement('source');
            sourceDom.onerror = this._onSourceError;
            sourceDom.setAttribute('src', src);
            this._sourcesDom.push(sourceDom);
            this.dom.appendChild(sourceDom);
            _results.push(this._okSources.push(sourceDom.src))
        }
        return _results
    };
    MediaW.prototype._onError = function() {
        Uppod.trace('MediaW#_onError');
        if (!this._onErrorOnce) {
            this._onErrorOnce = true;
            return this.onError.trigger()
        }
    };
    MediaW.prototype._onPause = function() {
        return clearInterval(this._intervalPlayProcess)
    };
    MediaW.prototype._onPlay = function() {};
    MediaW.prototype._onPlaying = function() {
        clearInterval(this._intervalPlayProcess);
        return this._intervalPlayProcess = setInterval(this._onPlayProcess, MediaW.TICK_SEC * 1000)
    };
    MediaW.prototype._onPlayProcess = function() {
        this.onPlayProcess.trigger({
            mediaW: this
        });
        if (this.options.ads) {
            return this.options.ads.mediaPlayingProcess()
        }
    };
    MediaW.prototype._onEnded = function() {
        if (this.options.ads && this.options.ads.isPostroll) {
            return this.options.ads.playPostroll({
                done: (function(_this) {
                    return function() {
                        return _this.onEnded.trigger()
                    }
                })(this)
            })
        } else {
            return this.onEnded.trigger()
        }
    };
    MediaW.prototype._onVideoError = function(event) {
        return this._onError()
    };
    MediaW.prototype._onSourceError = function(event) {
        var badIndex;
        badIndex = this._okSources.indexOf(event.target.src);
        if (badIndex >= 0) {
            this._okSources.splice(badIndex, 1)
        }
        if (this._okSources.length === 0) {
            return this._onError()
        }
    };
    MediaW.prototype._destroySourcesDom = function() {
        var sourceDom, _i, _len, _ref, _results;
        _ref = this._sourcesDom;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sourceDom = _ref[_i];
            sourceDom.onerror = void 0;
            sourceDom.setAttribute('src', '');
            _results.push(this.dom.removeChild(sourceDom))
        }
        return _results
    };
    return MediaW
})();
window.Uppod.MediaW = MediaW;
var Uppod = Uppod || {};
Uppod.Shaper2 = function(v) {
    this.c = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.canvas.height = v.h;
    this.canvas.width = v.w;
    var ctx = this.canvas.getContext("2d");
    !v.h0 ? v.h0 = 0 : '';
    if (v.bgc.indexOf('|') > 0) {
        var gr = v.bgc.split('|');
        var gradient = ctx.createLinearGradient(0, v.h0, 0, v.h);
        for (var i = 0; i < (gr.length - 1); i++) {
            gradient.addColorStop(i / (gr.length - 1), '#' + ReColor(gr[i]))
        }
        gradient.addColorStop(1, '#' + ReColor(gr[(gr.length - 1)]));
        gr[0] = ReColor(gr[0]);
        gr[(gr.length - 1)] = ReColor(gr[(gr.length - 1)]);
        v.bga1 != undefined ? gradient.addColorStop(0, 'rgba(' + HTR(gr[0]) + ',' + HTG(gr[0]) + ',' + HTB(gr[0]) + ',' + v.bga1 + ')') : '';
        v.bga2 != undefined ? gradient.addColorStop(0.999, 'rgba(' + HTR(gr[(gr.length - 1)]) + ',' + HTG(gr[(gr.length - 1)]) + ',' + HTB(gr[(gr.length - 1)]) + ',' + v.bga2 + ')') : '';
        ctx.fillStyle = gradient
    } else {
        ctx.fillStyle = "#" + ReColor(v.bgc)
    }
    if (v.a) {
        ctx.globalAlpha = v.a < 0 ? 0 : v.a
    }
    if (v.o > 0) {
        if (v.o == v.w / 2) {
            ctx.beginPath();
            ctx.arc(v.w / 2, v.h / 2, v.w / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill()
        } else {
            ctx.beginPath();
            ctx.moveTo((v.onotop == 1 ? 0 : v.o), 0);
            ctx.lineTo(v.w - (v.onotop == 1 ? 0 : v.o), 0);
            v.onotop == 1 ? '' : ctx.quadraticCurveTo(v.w, 0, v.w, v.o);
            ctx.lineTo(v.w, v.h - v.o);
            ctx.quadraticCurveTo(v.w, v.h, v.w - v.o, v.h);
            ctx.lineTo(v.o, v.h);
            ctx.quadraticCurveTo(0, v.h, 0, v.h - v.o);
            ctx.lineTo(0, v.o);
            v.onotop == 1 ? '' : ctx.quadraticCurveTo(0, 0, v.o, 0);
            !v.brdc ? v.brdc = 'cccccc' : '';
            ctx.strokeStyle = '#' + ReColor(v.brdc);
            if (v.brd == 0 || !v.brd) {
                v.brd = 0.1
            }
            ctx.lineWidth = v.brd;
            ctx.stroke();
            ctx.fill()
        }
    } else {
        ctx.fillRect(0, 0, v.w, v.h)
    }
    delete ctx;
    this.c.appendChild(this.canvas)
};
window.Uppod.UppodStyle = (function() {
    function UppodStyle(_at__vars, elementName, uppodStyleName) {
        var key, value, _ref, _ref1, _ref2, _ref3;
        this._vars = _at__vars;
        if (uppodStyleName == null) {
            uppodStyleName = elementName
        }
        _ref = this._vars.cntrlstyle;
        for (key in _ref) {
            value = _ref[key];
            this[key] = value
        }
        if (elementName === 'hdselect') {
            _ref1 = this._vars.cntrlhdselect;
            for (key in _ref1) {
                value = _ref1[key];
                this[key] = value
            }
        }
        _ref2 = this._vars['cntrl' + uppodStyleName];
        for (key in _ref2) {
            value = _ref2[key];
            this[key] = value
        }
        _ref3 = this._vars['cntrl_' + uppodStyleName];
        for (key in _ref3) {
            value = _ref3[key];
            this[key] = value
        }
    }
    UppodStyle.prototype.get = function(key, options) {
        return this[key] || this._vars.lang2[options.or_lang2]
    };
    return UppodStyle
})();
Uppod.CheckBase64 = function(i) {
    if (i.indexOf('http://') == 0 && i.indexOf('.') == -1 && i.length > 100) {
        i = 'data:image/png;base64,' + i.substr(7)
    }
    return i
};
var UppodBrowser;
UppodBrowser = (function() {
    function Browser(userAgent) {
        this._userAgent = userAgent || navigator.userAgent;
        this._property('restrictMediaPlay', function() {
            return this._mobile() && !this._firefox()
        });
        this._property('forceNativePlayBtn', function() {
            return this._iPhone()
        });
        this._property('restrictMediaClick', function() {
            return this._mobile() && this._ios()
        });
        this._property('restrictMediaMuted', function() {
            return this._mobile() && this._ios()
        });
        this._property('hasMouseEvents', function() {
            return !this._mobile()
        });
        this._property('isOpera', function() {
            return this._opera()
        });
        this._property('forceFullscreen', function() {
            return this._iPhone()
        });
        this._property('hasMp4', function() {
            var doesNot;
            doesNot = doesNot || (this._osWin() && this._opera());
            if (doesNot) {
                return false
            } else {
                return true
            }
        });
        this._property('hasWebm', function() {
            if (this._safari() || this._ios() || this._ie()) {
                return false
            } else {
                return true
            }
        });
        this._property('hasCorsRedirect', function() {
            return false
        });
        this._property('seekAfterFullLoad', function() {
            return this._desktop() && this._safari()
        });
        this._property('doSendCanPlay', function() {
            return !this._iPhone() && !this._iPad() && !this._iPod()
        });
        this._property('hasMediaPosterShown', function() {
            return !this._android()
        });
        this._property('allowHtmlOverMediaControl', function() {
            return !this._android()
        });
        this._property('mobileFirefox', function() {
            return this._mobile() && this._firefox()
        })
    }
    Browser.prototype._desktop = function() {
        return !this._mobile()
    };
    Browser.prototype._version = function() {
        var ver;
        ver = /Version\/([0-9\.A-z]+)/.exec(this._userAgent);
        if (ver) {
            return ver[1].split('.')[0]
        } else {
            return void 0
        }
    };
    Browser.prototype._mobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this._userAgent)
    };
    Browser.prototype._ios = function() {
        return /iPhone|iPad|iPod/i.test(this._userAgent)
    };
    Browser.prototype._osWin = function() {
        return /Windows NT/i.test(this._userAgent)
    };
    Browser.prototype._ie = function() {
        return /MSIE|Trident/i.test(this._userAgent)
    };
    Browser.prototype._android = function() {
        return /Android/i.test(this._userAgent)
    };
    Browser.prototype._firefox = function() {
        return /Firefox/i.test(this._userAgent)
    };
    Browser.prototype._opera = function() {
        return /OPR\//i.test(this._userAgent)
    };
    Browser.prototype._safari = function() {
        return !this._chrome() && /Safari/i.test(this._userAgent)
    };
    Browser.prototype._chrome = function() {
        return /Chrome/i.test(this._userAgent)
    };
    Browser.prototype._iPhone = function() {
        return /iPhone/i.test(this._userAgent)
    };
    Browser.prototype._iPad = function() {
        return /iPad/i.test(this._userAgent)
    };
    Browser.prototype._iPod = function() {
        return /iPod/i.test(this._userAgent)
    };
    Browser.prototype._property = function(name, getCallback) {
        return Object.defineProperty(this, name, {
            get: getCallback
        })
    };
    return Browser
})();
window.Uppod.Browser = UppodBrowser;
window.Uppod.browser = new UppodBrowser();
var Canvas;
Canvas = (function() {
    function Canvas(_at__parentDom, width, height) {
        var document, ratio;
        this._parentDom = _at__parentDom;
        document = this._parentDom.ownerDocument;
        this.dom = document.createElement('canvas');
        this.context = this.dom.getContext('2d');
        ratio = 1;
        if (this.context.webkitBackingStorePixelRatio < 2) {
            ratio = window.devicePixelRatio || 1
        }
        this.context.scale(ratio, ratio);
        this.dom.width = width * ratio;
        this.dom.height = height * ratio;
        this._parentDom.appendChild(this.dom)
    }
    Canvas.prototype.context = {};
    Canvas.prototype.dom = {};
    Canvas.prototype._parentDom = {};
    return Canvas
})();
window.Uppod.Canvas = Canvas;
window.Uppod.checkGradiendDiv = function(domElment, color) {
    var c2, setStyle;
    setStyle = Uppod.setStyle;
    if (color.indexOf('|') > 0) {
        c2 = color.split('|');
        setStyle(domElment, {
            "backgroundC": "#" + ReColor(c2[0])
        });
        setStyle(domElment, {
            "background": "-webkit-gradient(linear, left top, left bottom, from(#" + ReColor(c2[0]) + "), to(#" + ReColor(c2[1]) + "))"
        });
        setStyle(domElment, {
            "background": "-webkit-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
        });
        setStyle(domElment, {
            "background": "-moz-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
        });
        setStyle(domElment, {
            "background": "-ms-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
        });
        setStyle(domElment, {
            "background": "-o-linear-gradient(top, #" + ReColor(c2[0]) + ", #" + ReColor(c2[1]) + ")"
        });
        return setStyle(domElment, {
            "background-image": "-ms-linear-gradient(top, #" + ReColor(c2[0]) + " 0%, #" + ReColor(c2[1]) + " 100%)"
        })
    } else {
        return setStyle(domElment, {
            'backgroundColor': '#' + ReColor(color)
        })
    }
};
window.Uppod.ReadyState = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
};
window.Uppod.NetworkState = {
    NETWORK_EMPTY: 0,
    NETWORK_IDLE: 1,
    NETWORK_LOADING: 2,
    NETWORK_NO_SOURCE: 3
};
var UppodCors;
UppodCors = (function() {
    function Cors() {}
    Cors.get = function(url, callbacks) {
        var xhr;
        xhr = this._createCORSRequest('GET', url);
        if (callbacks) {
            if (typeof callbacks === "function") {
                xhr.onload = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        return callbacks(xhr.responseText)
                    }
                }
            }
            if (callbacks.success) {
                xhr.onload = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        return callbacks.success(xhr.responseText)
                    } else {
                        return callbacks.error(xhr)
                    }
                }
            }
            if (callbacks.error) {
                xhr.onerror = function() {
                    return callbacks.error(xhr)
                }
            }
        }
        return xhr.send()
    };
    Cors._createCORSRequest = function(method, url) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        if (xhr['withCredentials'] != null) {
            xhr.open(method, url, true)
        } else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url)
        } else {
            throw 'CORS is not supported by the browser'
        }
        return xhr
    };
    return Cors
})();
window.Uppod.Cors = UppodCors;
Uppod[('play' + 'e' + 'r' + 'E' + 't' + 'Wra' + 'p').replace('Et', '')] = '{{ aes_key }}';
Uppod.css = Uppod.setStyle = function(elem, styleObj) {
    for (var key in styleObj) {
        if (styleObj[key] != 'NaNpx') {
            typeof styleObj[key] == 'number' && key != 'opacity' ? styleObj[key] += 'px' : '';
            key == 'float' ? elem.style.cssFloat = styleObj[key] : '';
            key == 'pointer-events' ? elem.style.pointerEvents = styleObj[key] : '';
            if (elem != null) {
                elem.style[key] = styleObj[key]
            }
        }
    }
};
Uppod.cssShow = function(dom) {
    dom.style.display = 'block'
};
Uppod.cssHide = function(dom) {
    dom.style.display = 'none'
};
Uppod.addClass = function(dom, className) {
    if (dom.classList) dom.classList.add(className);
    else dom.className += ' ' + className
};
Uppod.removeClass = function(dom, className) {
    if (dom.classList) {
        dom.classList.remove(className)
    } else {
        var p = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
        dom.className = dom.className.replace(p, ' ')
    }
};
var UppodEvent;
UppodEvent = (function() {
    function Event() {
        this.listeners = []
    }
    Event.prototype.listeners = [];
    Event.prototype.trigger = function(dataObj) {
        var listener, _i, _len, _ref, _results;
        _ref = this.listeners;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            listener = _ref[_i];
            _results.push(listener(dataObj))
        }
        return _results
    };
    Event.prototype.bind = function(callback) {
        return this.listeners.push(callback)
    };
    Event.prototype.remove = function(callbackRef) {
        var i, _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.listeners.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (this.listeners[i] === callbackRef) {
                _results.push(this.listeners.splice(i, 1))
            } else {
                _results.push(void 0)
            }
        }
        return _results
    };
    return Event
})();
window.Uppod.Event = UppodEvent;
Uppod.Fullscreen = (function() {
    function Fullscreen() {}
    Fullscreen.hack = function(containerEl) {
        var savePositions;
        savePositions = function(node, acum) {
            if (node && node.tagName !== document.body.tagName) {
                if (node.style.position !== '') {
                    acum.push({
                        node: node,
                        position: node.style.position
                    })
                }
                savePositions(node.parentNode, acum)
            }
            return acum
        };
        return savePositions(containerEl.parentNode, [])
    };
    Fullscreen.request = function(elem) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
            return true
        } else if (elem.requestFullscreen) {
            elem.requestFullscreen();
            return true
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
            return true
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
            return true
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            return true
        }
        return false
    };
    return Fullscreen
})();
Uppod.IconImg = function(icon, c, n, w, h, half) {
    var CSS = Uppod.setStyle;
    var CheckBase64 = Uppod.CheckBase64;
    if (half == 1 && w > 0 && h > 0) {
        var img_icon = document.createElement('div');
        CSS(img_icon, {
            "width": w / 2 + 'px',
            "height": h + 'px',
            "overflow": "hidden"
        });
        if (n > 0) {
            var icon1 = (icon.indexOf("|") > -1 ? icon.substr(0, icon.indexOf("|")) : icon);
            var icon2 = (icon.indexOf("|") > -1 ? icon.substr(icon.indexOf("|") + 1) : icon);
            icon1 = CheckBase64(icon1);
            icon2 = CheckBase64(icon2);
            n == 1 ? CSS(img_icon, {
                "background": "url(" + icon1 + ") no-repeat 0 0"
            }) : '';
            n == 2 ? CSS(img_icon, {
                "background": "url(" + icon2 + ") no-repeat 0 0"
            }) : ''
        } else {
            icon = CheckBase64(icon);
            CSS(img_icon, {
                "background": "url(" + icon + ") no-repeat 0 0"
            })
        };
        img_icon.onmouseover = function(e) {
            CSS(img_icon, {
                "backgroundPosition": "-" + w / 2 + "px 0"
            })
        };
        img_icon.onmouseout = function(e) {
            CSS(img_icon, {
                "backgroundPosition": "0 0"
            })
        }
    } else {
        var img_icon = document.createElement('img');
        if (n > 0) {
            var icon1 = icon.indexOf("|") > -1 ? icon.substr(0, icon.indexOf("|")) : icon;
            var icon2 = icon.indexOf("|") > -1 ? icon.substr(icon.indexOf("|") + 1) : icon;
            icon1 = CheckBase64(icon1);
            icon2 = CheckBase64(icon2);
            n == 1 ? img_icon.setAttribute("src", icon1) : '';
            n == 2 ? img_icon.setAttribute("src", icon2) : ''
        } else {
            img_icon.setAttribute("src", icon)
        }
    }
    c.appendChild(img_icon)
};
var JSON;
if (!JSON) {
    JSON = {}
}
JSON.keyup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
(function() {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key)
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null'
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null'
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' '
                }
            } else if (typeof space === 'string') {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify')
            }
            return str('', {
                '': value
            })
        }
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j
            }
            throw new SyntaxError('JSON.parse')
        }
    }
}());
var UppodLinkParser;
UppodLinkParser = (function() {
    function LinkParser(link) {
        var andLinks, i, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        this.orLinks = link.split(' or ');
        _ref = this.orLinks;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            link = _ref[i];
            this.orLinks[i] = link.split(' and ')
        }
        _ref1 = this.orLinks;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            andLinks = _ref1[_j];
            for (i = _k = 0, _len2 = andLinks.length; _k < _len2; i = ++_k) {
                link = andLinks[i];
                andLinks[i] = link.trim()
            }
        }
    }
    LinkParser.prototype.orLinks = [];
    return LinkParser
})();
window.Uppod.LinkParser = UppodLinkParser;
Uppod.log = function(mes) {
    if (console.log) {
        return console.log(mes)
    }
};
Uppod.trace = function(mes) {
    var mesEl, traceConsole;
    if (Uppod.isTrace) {
        traceConsole = document.body.querySelector('.uppod-trace');
        if (!traceConsole) {
            traceConsole = document.createElement('pre');
            traceConsole.className = 'uppod-trace';
            document.body.insertBefore(traceConsole, document.body.firstChild);
            Uppod.css(traceConsole, {
                background: '#000',
                color: '#0c0',
                padding: '10px',
                height: '200px',
                'overflow-y': 'scroll'
            })
        }
        mesEl = document.createTextNode(mes + "\n");
        return traceConsole.insertBefore(mesEl, traceConsole.firstChild)
    }
};
Uppod.measureText = function(pText, pFontSize, pStyle) {
    var css = Uppod.setStyle;
    var lDiv = document.createElement('lDiv');
    document.body.appendChild(lDiv);
    if (pStyle != null) {
        lDiv.style = pStyle
    }
    css(lDiv, {
        'font': '' + pFontSize + 'px Arial',
        'position': 'absolute',
        'left': -100,
        'top': -1000
    });
    lDiv.innerHTML = pText;
    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };
    document.body.removeChild(lDiv);
    lDiv = null;
    return lResult
};

function Tween(v) {
    v.dur == undefined ? v.dur = 1000 : '';
    if (v.what == 'a') {
        new Fx.Morph(v.mc, {
            duration: v.dur
        }).start({
            'opacity': [v.from, v.to]
        })
    }
}

function ReColor(c) {
    if (c) {
        var c0 = c;
        c.indexOf('|') > -1 ? c = c.split('|')[0] : '';
        if (c.length == 1) {
            c = c0 + c0 + c0 + c0 + c0 + c0
        }
        if (c.length == 2) {
            c = '0000' + c
        }
        if (c.length == 3) {
            c = c0.substr(0, 1) + c0.substr(0, 1) + c0.substr(1, 2) + c0.substr(1, 2) + c0.substr(2, 3) + c0.substr(2, 3)
        }
        if (c.length == 4) {
            c = '00' + c
        }
        if (c.length == 5) {
            c = '0' + c
        }
    }
    return c
}

function HTR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
}

function HTG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
}

function HTB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
}

function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}

function ShowHide(mc) {
    mc.style.display == 'none' ? mc.style.display = 'block' : mc.style.display = 'none'
}

function Show(mc) {
    if (mc) {
        mc.style.display = 'block'
    }
}

function Hide(mc) {
    if (mc) {
        mc.style.display = 'none'
    }
}
window[('epyVidh' + 'v' + 'a' + 'l' + 'u' + 'p').replace('pyVidh', '')] = function(str) {
    UppodUpcat.show(str)
};

function ToggleView(mc) {
    if (mc) {
        mc.style.display == 'none' ? mc.style.display = 'block' : mc.style.display = 'none'
    }
}

function is_array(input) {
    return typeof(input) == 'object' && (input instanceof Array)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
Uppod.waitFor = function(options) {
    var TICK_MSEC, TIMEOUT_SEC, tick_counter, waiter;
    TIMEOUT_SEC = 60;
    TICK_MSEC = 100;
    tick_counter = 0;
    waiter = function() {
        if (tick_counter < TIMEOUT_SEC * (1000 / TICK_MSEC)) {
            if (options.condition()) {
                return options.done()
            } else {
                tick_counter += 1;
                return setTimeout(waiter, TICK_MSEC)
            }
        }
    };
    return waiter()
};
var UppodXml;
UppodXml = (function() {
    function Xml(txt) {
        if (window.DOMParser) {
            this._xml = new DOMParser().parseFromString(txt, 'text/xml')
        } else {
            this._xml = new ActiveXObject('Microsoft.XMLDOM');
            this._xml.async = false;
            this._xml.loadXML(txt)
        }
        window.xml = this
    }
    Xml.prototype.getOne = function(selector) {
        return this._xml.querySelector(selector)
    };
    Xml.prototype.get = function(selector) {
        return this._xml.querySelectorAll(selector)
    };
    Xml.prototype._xml = null;
    return Xml
})();
window.Uppod.Xml = UppodXml;
var __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key]
        }

        function ctor() {
            this.constructor = child
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child
    },
    __hasProp = {}.hasOwnProperty;
window.Uppod.ControlBar = (function(_super) {
    __extends(ControlBar, _super);

    function ControlBar(_at__uppod) {
        this._uppod = _at__uppod;
        ControlBar.__super__.constructor.call(this, 'ControlBar', {
            dom: document.createElement('div')
        });
        this.css({
            'position': 'absolute'
        });
        this.dom.style.zIndex = 5;
        this._setLeftTop();
        this._uppod.playerBodyElement().c.appendChild(this.dom)
    }
    ControlBar.prototype._uppod = null;
    ControlBar.prototype._vars = function() {
        return this._uppod.vars()
    };
    ControlBar.prototype._calcTop = function() {
        var controlBarPadding, vars;
        vars = this._vars();
        controlBarPadding = vars.cntrlout === 1 ? vars.padding / 2 : 0;
        if (this._uppod.isFullscreen()) {
            return vars.sh - vars.cntrloutheight - controlBarPadding - 0
        } else {
            return vars.ph - vars.cntrloutheight - controlBarPadding - vars.padding
        }
    };
    ControlBar.prototype._setLeftTop = function() {
        return this.css({
            'top': this._calcTop(),
            'left': this._uppod.isFullscreen() ? 0 : this._vars().padding
        })
    };
    ControlBar.prototype.resize = function() {
        return this._setLeftTop()
    };
    return ControlBar
})(window.Uppod.Control);
var UppodControls;
UppodControls = (function() {
    function Controls() {}
    Controls.prototype.activateBaseUI = function() {
        return this.activate(Controls._base)
    };
    Controls.prototype.deactivateBaseUI = function() {
        return this.deactivate(Controls._base)
    };
    Controls.prototype.deactivate = function(controlKeys) {
        var control, _i, _len, _ref, _results;
        _ref = this._wrapEach(controlKeys);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            control = _ref[_i];
            _results.push(control.deactivate())
        }
        return _results
    };
    Controls.prototype.activate = function(controlKeys) {
        var control, _i, _len, _ref, _results;
        _ref = this._wrapEach(controlKeys);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            control = _ref[_i];
            _results.push(control.activate())
        }
        return _results
    };
    Controls.prototype.add = function(control) {
        return this[control.key] = control
    };
    Controls.prototype.addElement = function(key, element) {
        return this[key] = new this._create(key, {
            element: element
        })
    };
    Controls.prototype.addDom = function(key, dom) {
        return this[key] = new this._create(key, {
            dom: dom
        })
    };
    Controls.prototype._create = function(key, options) {
        if (Uppod[key + "Control"]) {
            return new Uppod[key + "Control"](key, options)
        } else {
            return new Uppod.Control(key, options)
        }
    };
    Controls.prototype._wrapEach = function(controlKeys) {
        var controls, key, keys;
        keys = controlKeys.split(' ');
        controls = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = keys.length; _i < _len; _i++) {
                key = keys[_i];
                _results.push(this[key])
            }
            return _results
        }).call(this);
        return controls.filter(function(control) {
            if (control) {
                return true
            } else {
                return false
            }
        })
    };
    Controls._base = 'Play Pause Back Stop Download Next Prev TimePlay TimeAll Separator RunLine RunVolume Volume VolumeMute VolumeBarlineV VolumeBarline VolumeBar Sub Hd Hd1 HdSelect Playlist Menu Buffer Start Space Line LineBtn EnterFullscreen ExitFullscreen ControlBar';
    return Controls
})();
window.Uppod.Controls = UppodControls;
var Uppod = Uppod || {};
Uppod.Element = function(vars, name, bw, bh, nm2, uppodStyleName) {
    var CSS = Uppod.setStyle;
    var measureText = Uppod.measureText;
    var IconImg = Uppod.IconImg;
    var selfDom = this.selfDom = this.c = document.createElement('div');
    var uppodStyle = this.uppodStyle = this.s = new Uppod.UppodStyle(vars, name, uppodStyleName);
    uppodStyle.scale ? uppodStyle.scale *= vars.cntrlsize : '';
    if (name == 'hd' || name == 'hd1') {
        bw = measureText((name == 'hd1' ? uppodStyle.icon2 : uppodStyle.icon), 12).width + 6 * uppodStyle.scale
    }
    if (name == 'sub') {
        bw = measureText(uppodStyle.icon, 12).width + 6 * uppodStyle.scale
    }
    if (nm2 == 'all') {
        uppodStyle.color = uppodStyle.color_all
    }
    if (nm2 == 'load') {
        uppodStyle.color = uppodStyle.color_load
    }
    if (nm2 == 'play') {
        uppodStyle.color = uppodStyle.color_play
    }
    if (name == 'start') {
        if (uppodStyle.bg == 1) {
            if (bh * uppodStyle.scale2 > uppodStyle.bg_h || bw * uppodStyle.scale2 > uppodStyle.bg_w) {
                bh *= uppodStyle.scale2;
                bw *= uppodStyle.scale2
            } else {
                bh = uppodStyle.bg_h;
                bw = uppodStyle.bg_w
            }
        } else {
            bh *= uppodStyle.scale2;
            bw *= uppodStyle.scale2
        }
    }
    if (name == 'separator') {
        if (vars.sid) {
            if (uppodStyle.scale != 1) {
                uppodStyle.margintop = 0;
                uppodStyle.marginbottom = 0;
                if (uppodStyle.scale * 20 > vars.cntrloutheight) {
                    uppodStyle.scale = vars.cntrloutheight / 20
                }
            }
        }
    }
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
    var ratio = 1;
    if (this.ctx.webkitBackingStorePixelRatio < 2) {
        ratio = window.devicePixelRatio || 1
    };
    this.canvas.height = bh * uppodStyle.scale * ratio;
    this.canvas.width = bw * uppodStyle.scale * ratio;
    this.ctx.scale(ratio, ratio);
    if (uppodStyle.bg == 1 && name.indexOf('line') == -1) {
        var bg = new Uppod.Shaper2({
            w: bw * uppodStyle.scale,
            h: bh * uppodStyle.scale,
            o: (uppodStyle.bg_o > 1 ? uppodStyle.bg_o / 2 : bh / 2 * uppodStyle.bg_o * uppodStyle.scale),
            bgc: uppodStyle.bgcolor,
            sh: uppodStyle.bg_sh,
            sh_c: uppodStyle.sh_c,
            sh_a: uppodStyle.sh_a
        });
        selfDom.appendChild(bg.c);
        if (uppodStyle.bg_a) {
            CSS(bg.canvas, {
                "opacity": uppodStyle.bg_a,
                "filter": "alpha(opacity=" + (uppodStyle.bg_a * 100) + ")"
            })
        }
        CSS(bg.canvas, {
            "position": "absolute",
            "top": uppodStyle.margintop * 1 - uppodStyle.marginbottom * 1,
            "left": (name != 'start' ? (1 - uppodStyle.scale) * bw / 2 : 0)
        });
        if (uppodStyle.bg_gl == 1) {
            var bg_gl = new Uppod.Shaper2({
                w: bw * uppodStyle.scale,
                h: bh * uppodStyle.scale,
                o: bh / 2 * uppodStyle.bg_o * uppodStyle.scale,
                bgc: uppodStyle.gl_color + '|' + uppodStyle.gl_color,
                bga1: uppodStyle.gl_a1,
                bga2: uppodStyle.gl_a2
            });
            selfDom.appendChild(bg_gl.c);
            CSS(bg_gl.canvas, {
                "position": "absolute",
                "top": 0,
                "left": (1 - uppodStyle.scale) * bw / 2 + (bh * uppodStyle.scale / 8),
                "height": (bh * uppodStyle.scale / 2),
                "width": bw * uppodStyle.scale - (bh * uppodStyle.scale / 4)
            })
        }
    }
    this.fstyle = '';
    if (uppodStyle.color) {
        if (uppodStyle.color.indexOf('|') > 0) {
            var gr = uppodStyle.color.split('|');
            var gradient = this.ctx.createLinearGradient(0, 0, 0, bh * uppodStyle.scale);
            for (this.j = 0; this.j < (gr.length - 1); this.j++) {
                gradient.addColorStop(this.j / (gr.length - 1), '#' + ReColor(gr[this.j]))
            }
            gradient.addColorStop(1, '#' + ReColor(gr[(gr.length - 1)]));
            this.fstyle = gradient
        } else {
            this.fstyle = "#" + ReColor(uppodStyle.color)
        }
    }
    this.ctx.fillStyle = this.fstyle;
    if (uppodStyle.sh == 1) {
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = (uppodStyle.sh_under == 1 ? 2 : 0);
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = 'rgba(' + HTR('#' + ReColor(uppodStyle.sh_c)) + ',' + HTG('#' + ReColor(uppodStyle.sh_c)) + ',' + HTB('#' + ReColor(uppodStyle.sh_c)) + ',' + uppodStyle.sh_a + ')'
    }
    if (name == 'play' || name == 'start') {
        var playscl = (name == 'play' ? uppodStyle.scale : uppodStyle.scale2);
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 1, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover);
            if (name == 'start' && uppodStyle.pic_w > 1 && uppodStyle.pic_h > 1) {
                bh = uppodStyle.pic_h
            }
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * playscl, 4 * playscl);
                this.ctx.lineTo(16 * playscl, 9 * playscl);
                this.ctx.lineTo(6 * playscl, 15 * playscl);
                this.ctx.lineTo(6 * playscl, 4 * playscl);
                this.ctx.closePath();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * playscl, 5 * playscl);
                this.ctx.quadraticCurveTo(6 * playscl, 4 * playscl, 7 * playscl, 4 * playscl);
                this.ctx.lineTo(15 * playscl, 9 * playscl);
                this.ctx.quadraticCurveTo(16 * playscl, 10 * playscl, 15 * playscl, 11 * playscl);
                this.ctx.lineTo(7 * playscl, 16 * playscl);
                this.ctx.quadraticCurveTo(6 * playscl, 16 * playscl, 6 * playscl, 15 * playscl);
                this.ctx.lineTo(6 * playscl, 5 * playscl);
                this.ctx.closePath();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.moveTo(6 * playscl, 5 * playscl);
                this.ctx.lineTo(15 * playscl, 10 * playscl);
                this.ctx.lineTo(6 * playscl, 15 * playscl);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 3 * playscl;
                this.ctx.stroke()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * playscl, 4 * playscl);
                this.ctx.lineTo(16 * playscl, 10 * playscl);
                this.ctx.lineTo(6 * playscl, 16 * playscl);
                this.ctx.lineTo(6 * playscl, 4 * playscl);
                this.ctx.lineTo(6 * playscl, 5 * playscl);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 1.5 * playscl;
                this.ctx.stroke()
            }
        }
    }
    if (name.indexOf('my') == 0) {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 2, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            selfDom.innerHTML = uppodStyle.icon;
            CSS(this.c, {
                "width": bw,
                "color": "#" + uppodStyle.color,
                "font": "10px Arial"
            })
        }
    }
    if (name == 'sub') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 2, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            this.ctx.fillStyle = uppodStyle.color;
            !uppodStyle.icon2 ? uppodStyle.icon2 = uppodStyle.icon : '';
            this.ctx.font = "normal " + (12 * uppodStyle.scale) + "px Arial";
            this.ctx.fillText((name == 'hd1' ? uppodStyle.icon2 : uppodStyle.icon), 3 * uppodStyle.scale, 15 * uppodStyle.scale)
        }
    }
    if (name == 'pause') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 2, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        }
        if (uppodStyle.icon == 0) {
            this.ctx.beginPath();
            this.ctx.fillRect(6 * uppodStyle.scale, 5 * uppodStyle.scale, 3 * uppodStyle.scale, 10 * uppodStyle.scale);
            this.ctx.fillRect(12 * uppodStyle.scale, 5 * uppodStyle.scale, 3 * uppodStyle.scale, 10 * uppodStyle.scale);
            this.ctx.closePath();
            this.ctx.fill()
        }
        if (uppodStyle.icon > 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(7 * uppodStyle.scale, 5 * uppodStyle.scale);
            this.ctx.lineTo(7 * uppodStyle.scale, 15 * uppodStyle.scale);
            this.ctx.moveTo(14 * uppodStyle.scale, 5 * uppodStyle.scale);
            this.ctx.lineTo(14 * uppodStyle.scale, 15 * uppodStyle.scale);
            this.ctx.strokeStyle = "#" + uppodStyle.color;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.lineWidth = 3 * uppodStyle.scale;
            this.ctx.stroke()
        }
    }
    if (name == 'stop') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(5 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.moveTo(14 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 3 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 4 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.beginPath();
                this.ctx.lineWidth = 1.5 * uppodStyle.scale;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.strokeRect(5 * uppodStyle.scale, 5 * uppodStyle.scale, 11 * uppodStyle.scale, 11 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.stroke()
            }
        }
    }
    if (name == 'download') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(8 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.lineTo(8 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 16 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.lineTo(8 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(4 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 11 * uppodStyle.scale);
                this.ctx.lineTo(16 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(17 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(3 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(4 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(5 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
        }
    }
    if (name == 'next') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(4 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(9 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(9 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(16 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(9 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(9 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(4 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(4 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(7 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 17 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 16 * uppodStyle.scale);
                this.ctx.lineTo(11 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(12 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
        }
    }
    if (name == 'prev') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(4 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(11 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(11 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(16 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(16 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(11 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(11 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(4 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(12 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(8 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 16 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 17 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(7 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
        }
    }
    if (name == 'back') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(4 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(24 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(24 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1 || uppodStyle.icon == 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(5 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(23 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(23 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 2 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.beginPath();
                this.ctx.moveTo(5 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(25 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.lineTo(25 * uppodStyle.scale, 16 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 16 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 1.5 * uppodStyle.scale;
                this.ctx.stroke()
            }
        }
    }
    if (name == 'volume' || name == 'volume_mute') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, (name == 'volume' ? 1 : 2), uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(5 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(9 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(9 * uppodStyle.scale, 11 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 11 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 8 * uppodStyle.scale);
                if (name == 'volume') {
                    this.ctx.moveTo(15 * uppodStyle.scale, 7 * uppodStyle.scale);
                    this.ctx.lineTo(16 * uppodStyle.scale, 7 * uppodStyle.scale);
                    this.ctx.lineTo(16 * uppodStyle.scale, 12 * uppodStyle.scale);
                    this.ctx.lineTo(15 * uppodStyle.scale, 12 * uppodStyle.scale);
                    this.ctx.lineTo(15 * uppodStyle.scale, 7 * uppodStyle.scale)
                }
                this.ctx.closePath();
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(4 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.lineTo(4 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.lineTo(4 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.moveTo(7 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 17 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.closePath();
                if (name == 'volume') {
                    this.ctx.moveTo(15 * uppodStyle.scale, 8 * uppodStyle.scale);
                    this.ctx.arc(15 * uppodStyle.scale, 10 * uppodStyle.scale, 4 * uppodStyle.scale, Math.PI * 1.6, Math.PI / 2.3, false);
                    this.ctx.lineTo(15 * uppodStyle.scale, 12 * uppodStyle.scale);
                    this.ctx.arc(14 * uppodStyle.scale, 10 * uppodStyle.scale, 4 * uppodStyle.scale, Math.PI / 2.3, Math.PI * 1.6, true);
                    this.ctx.moveTo(16 * uppodStyle.scale, 9 * uppodStyle.scale);
                    this.ctx.lineTo(16 * uppodStyle.scale, 11 * uppodStyle.scale);
                    this.ctx.lineTo(15 * uppodStyle.scale, 11 * uppodStyle.scale);
                    this.ctx.lineTo(15 * uppodStyle.scale, 9 * uppodStyle.scale)
                }
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                ovalX = 8 * uppodStyle.scale;
                ovalY = 14 * uppodStyle.scale;
                ovalW = 7 * uppodStyle.scale;
                ovalH = 3 * uppodStyle.scale;
                this.ctx.moveTo(ovalX, ovalY - ovalH / 2);
                this.ctx.bezierCurveTo(ovalX - ovalW / 2, ovalY - ovalH / 2, ovalX - ovalW / 2, ovalY + ovalH / 2, ovalX, ovalY + ovalH / 2);
                this.ctx.bezierCurveTo(ovalX + ovalW / 2, ovalY + ovalH / 2, ovalX + ovalW / 2, ovalY - ovalH / 2, ovalX, ovalY - ovalH / 2);
                this.ctx.moveTo(10 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(11 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.quadraticCurveTo(13 * uppodStyle.scale, 4 * uppodStyle.scale, 13 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.quadraticCurveTo(15 * uppodStyle.scale, 6 * uppodStyle.scale, 17 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.quadraticCurveTo(14 * uppodStyle.scale, 8 * uppodStyle.scale, 11 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineWidth = 0.7;
                this.ctx.stroke();
                this.ctx.fill()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.beginPath();
                this.ctx.lineWidth = 1.5 * uppodStyle.scale;
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.moveTo(3 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 4 * uppodStyle.scale);
                this.ctx.lineTo(12 * uppodStyle.scale, 16 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(3 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.lineTo(3 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 8 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 12 * uppodStyle.scale);
                if (name == 'volume') {
                    this.ctx.moveTo(15 * uppodStyle.scale, 7 * uppodStyle.scale);
                    this.ctx.lineTo(18 * uppodStyle.scale, 4 * uppodStyle.scale);
                    this.ctx.moveTo(15 * uppodStyle.scale, 10 * uppodStyle.scale);
                    this.ctx.lineTo(19 * uppodStyle.scale, 10 * uppodStyle.scale);
                    this.ctx.moveTo(15 * uppodStyle.scale, 13 * uppodStyle.scale);
                    this.ctx.lineTo(18 * uppodStyle.scale, 16 * uppodStyle.scale)
                }
                this.ctx.stroke()
            }
        }
    }
    if (name == 'playlist') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 4 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.clearRect(5 * uppodStyle.scale, 5 * uppodStyle.scale, 9 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.fillRect(6 * uppodStyle.scale, 6 * uppodStyle.scale, 7 * uppodStyle.scale, 1 * uppodStyle.scale);
                this.ctx.fillRect(6 * uppodStyle.scale, 8 * uppodStyle.scale, 7 * uppodStyle.scale, 1 * uppodStyle.scale);
                this.ctx.fillRect(6 * uppodStyle.scale, 10 * uppodStyle.scale, 7 * uppodStyle.scale, 1 * uppodStyle.scale);
                this.ctx.fillRect(6 * uppodStyle.scale, 12 * uppodStyle.scale, 7 * uppodStyle.scale, 1 * uppodStyle.scale);
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                for (c = 5; c < 15; c += 3) {
                    this.ctx.moveTo(4 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.lineTo(16 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.lineTo(16 * uppodStyle.scale, (c + 1) * uppodStyle.scale);
                    this.ctx.lineTo(4 * uppodStyle.scale, (c + 1) * uppodStyle.scale);
                    this.ctx.lineTo(4 * uppodStyle.scale, c * uppodStyle.scale)
                }
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                for (c = 4; c < 15; c += 5) {
                    this.ctx.moveTo(3 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.lineTo(5 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.lineTo(5 * uppodStyle.scale, (c + 2) * uppodStyle.scale);
                    this.ctx.lineTo(3 * uppodStyle.scale, (c + 2) * uppodStyle.scale);
                    this.ctx.lineTo(3 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.moveTo(7 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.lineTo(17 * uppodStyle.scale, c * uppodStyle.scale);
                    this.ctx.lineTo(17 * uppodStyle.scale, (c + 2) * uppodStyle.scale);
                    this.ctx.lineTo(7 * uppodStyle.scale, (c + 2) * uppodStyle.scale);
                    this.ctx.lineTo(7 * uppodStyle.scale, c * uppodStyle.scale)
                }
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.beginPath();
                for (c = 4; c < 15; c += 5) {
                    for (y = 4; y < 15; y += 5) {
                        this.ctx.moveTo(y * uppodStyle.scale, c * uppodStyle.scale);
                        this.ctx.lineTo((y + 2) * uppodStyle.scale, c * uppodStyle.scale);
                        this.ctx.lineTo((y + 2) * uppodStyle.scale, (c + 2) * uppodStyle.scale);
                        this.ctx.lineTo(y * uppodStyle.scale, (c + 2) * uppodStyle.scale);
                        this.ctx.lineTo(y * uppodStyle.scale, c * uppodStyle.scale)
                    }
                }
                this.ctx.lineWidth = 0.1;
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.closePath()
            }
        }
    }
    if (name == 'full' || name == 'full_back') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, (name == 'full' ? 1 : 2), uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 4 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.clearRect(5 * uppodStyle.scale, 6 * uppodStyle.scale, 9 * uppodStyle.scale, 9 * uppodStyle.scale);
                if (name == 'full_back') {
                    this.ctx.fillRect(6 * uppodStyle.scale, 13 * uppodStyle.scale, 3 * uppodStyle.scale, 1 * uppodStyle.scale);
                    this.ctx.fillRect(6 * uppodStyle.scale, 10 * uppodStyle.scale, 1 * uppodStyle.scale, 3 * uppodStyle.scale)
                } else {
                    this.ctx.fillRect(10 * uppodStyle.scale, 7 * uppodStyle.scale, 3 * uppodStyle.scale, 1 * uppodStyle.scale);
                    this.ctx.fillRect(12 * uppodStyle.scale, 7 * uppodStyle.scale, 1 * uppodStyle.scale, 3 * uppodStyle.scale)
                }
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.beginPath();
                if (name == 'full_back') {
                    this.ctx.fillRect(7 * uppodStyle.scale, 4 * uppodStyle.scale, 11 * uppodStyle.scale, 7 * uppodStyle.scale);
                    this.ctx.clearRect(8 * uppodStyle.scale, 5 * uppodStyle.scale, 9 * uppodStyle.scale, 5 * uppodStyle.scale);
                    this.ctx.fillRect(2 * uppodStyle.scale, 7 * uppodStyle.scale, 13 * uppodStyle.scale, 8 * uppodStyle.scale);
                    this.ctx.clearRect(3 * uppodStyle.scale, 8 * uppodStyle.scale, 11 * uppodStyle.scale, 6 * uppodStyle.scale)
                } else {
                    this.ctx.fillRect(2 * uppodStyle.scale, 8 * uppodStyle.scale, 11 * uppodStyle.scale, 7 * uppodStyle.scale);
                    this.ctx.clearRect(3 * uppodStyle.scale, 9 * uppodStyle.scale, 9 * uppodStyle.scale, 5 * uppodStyle.scale);
                    this.ctx.fillRect(5 * uppodStyle.scale, 4 * uppodStyle.scale, 13 * uppodStyle.scale, 8 * uppodStyle.scale);
                    this.ctx.clearRect(6 * uppodStyle.scale, 5 * uppodStyle.scale, 11 * uppodStyle.scale, 6 * uppodStyle.scale)
                }
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(2 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 5.5 * uppodStyle.scale);
                this.ctx.lineTo(5.5 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(3 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(2 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(2 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.moveTo(14 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.lineTo(18 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.lineTo(18 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.lineTo(17 * uppodStyle.scale, 5 * uppodStyle.scale);
                this.ctx.lineTo(14.5 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 5.5 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 3 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 2 * uppodStyle.scale);
                this.ctx.moveTo(14.5 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.lineTo(17 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(18 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(18 * uppodStyle.scale, 18 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 18 * uppodStyle.scale);
                this.ctx.lineTo(15 * uppodStyle.scale, 17 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 14.5 * uppodStyle.scale);
                this.ctx.lineTo(14.5 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.moveTo(5.5 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.lineTo(7 * uppodStyle.scale, 14.5 * uppodStyle.scale);
                this.ctx.lineTo(5 * uppodStyle.scale, 17 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 18 * uppodStyle.scale);
                this.ctx.lineTo(2 * uppodStyle.scale, 18 * uppodStyle.scale);
                this.ctx.lineTo(2 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(3 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.lineTo(5.5 * uppodStyle.scale, 13 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(' + HTR(uppodStyle.color) + ',' + HTG(uppodStyle.color) + ',' + HTB(uppodStyle.color) + ',0.5)';
                this.ctx.fillRect(7 * uppodStyle.scale, 7 * uppodStyle.scale, 6 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.beginPath();
                if (name == 'full_back') {
                    this.ctx.moveTo(18 * uppodStyle.scale, 2 * uppodStyle.scale);
                    this.ctx.lineTo(2 * uppodStyle.scale, 16 * uppodStyle.scale);
                    this.ctx.lineTo(5 * uppodStyle.scale, 10 * uppodStyle.scale);
                    this.ctx.moveTo(2 * uppodStyle.scale, 16 * uppodStyle.scale);
                    this.ctx.lineTo(10 * uppodStyle.scale, 14 * uppodStyle.scale)
                } else {
                    this.ctx.moveTo(3 * uppodStyle.scale, 18 * uppodStyle.scale);
                    this.ctx.lineTo(17 * uppodStyle.scale, 2 * uppodStyle.scale);
                    this.ctx.lineTo(8 * uppodStyle.scale, 6 * uppodStyle.scale);
                    this.ctx.moveTo(17 * uppodStyle.scale, 2 * uppodStyle.scale);
                    this.ctx.lineTo(15 * uppodStyle.scale, 11 * uppodStyle.scale)
                }
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 1 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.closePath()
            }
        }
    }
    if (name == 'volbar') {
        this.ctx.beginPath();
        this.ctx.moveTo(0 * uppodStyle.scale, 0 * uppodStyle.scale);
        this.ctx.lineTo(3 * uppodStyle.scale, 0 * uppodStyle.scale);
        this.ctx.lineTo(3 * uppodStyle.scale, 10 * uppodStyle.scale);
        this.ctx.lineTo(0 * uppodStyle.scale, 10 * uppodStyle.scale);
        this.ctx.lineTo(0 * uppodStyle.scale, 0 * uppodStyle.scale);
        this.ctx.closePath();
        this.ctx.lineWidth = 0.1;
        this.ctx.stroke();
        this.ctx.fill()
    }
    if (name == 'menu') {
        if (String(uppodStyle.icon).indexOf("http://") > -1) {
            IconImg(uppodStyle.icon, this.c, 0, uppodStyle.pic_w, uppodStyle.pic_h, uppodStyle.halficonisover)
        } else {
            if (uppodStyle.icon == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(6 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 7 * uppodStyle.scale);
                this.ctx.lineTo(13 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.lineTo(6 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 4 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.clearRect(5 * uppodStyle.scale, 6 * uppodStyle.scale, 9 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.fillRect(9 * uppodStyle.scale, 10 * uppodStyle.scale, 1 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.fillRect(9 * uppodStyle.scale, 8 * uppodStyle.scale, 1 * uppodStyle.scale, 1 * uppodStyle.scale);
                this.ctx.closePath()
            }
            if (uppodStyle.icon == 1) {
                this.ctx.moveTo(8.5 * uppodStyle.scale, 5.5 * uppodStyle.scale);
                this.ctx.lineTo(3 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(8.5 * uppodStyle.scale, 12.5 * uppodStyle.scale);
                this.ctx.moveTo(11.5 * uppodStyle.scale, 5.5 * uppodStyle.scale);
                this.ctx.lineTo(17 * uppodStyle.scale, 9 * uppodStyle.scale);
                this.ctx.lineTo(11.5 * uppodStyle.scale, 12.5 * uppodStyle.scale);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 2 * uppodStyle.scale;
                this.ctx.stroke()
            }
            if (uppodStyle.icon == 2) {
                this.ctx.arc(10 * uppodStyle.scale, 7 * uppodStyle.scale, 3 * uppodStyle.scale, Math.PI / 2, -Math.PI, true);
                this.ctx.moveTo(10 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(10 * uppodStyle.scale, 12 * uppodStyle.scale);
                this.ctx.moveTo(10 * uppodStyle.scale, 15 * uppodStyle.scale);
                this.ctx.arc(10 * uppodStyle.scale, 15 * uppodStyle.scale, 0.5 * uppodStyle.scale, 0, Math.PI * 2);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 2 * uppodStyle.scale;
                this.ctx.stroke()
            }
            if (uppodStyle.icon == 3) {
                this.ctx.arc(6 * uppodStyle.scale, 10 * uppodStyle.scale, 2 * uppodStyle.scale, 0, Math.PI * 2);
                this.ctx.moveTo(14 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.arc(14 * uppodStyle.scale, 6 * uppodStyle.scale, 2 * uppodStyle.scale, 0, Math.PI * 2);
                this.ctx.moveTo(14 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.arc(14 * uppodStyle.scale, 14 * uppodStyle.scale, 2 * uppodStyle.scale, 0, Math.PI * 2);
                this.ctx.moveTo(6 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 6 * uppodStyle.scale);
                this.ctx.moveTo(6 * uppodStyle.scale, 10 * uppodStyle.scale);
                this.ctx.lineTo(14 * uppodStyle.scale, 14 * uppodStyle.scale);
                this.ctx.strokeStyle = "#" + uppodStyle.color;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.lineWidth = 1.5 * uppodStyle.scale;
                this.ctx.stroke();
                this.ctx.fill()
            }
        }
    }
    if (name == 'hd' || name == 'hd1') {
        this.ctx.fillStyle = uppodStyle.color;
        !uppodStyle.icon2 ? uppodStyle.icon2 = uppodStyle.icon : '';
        this.ctx.font = "normal " + (12 * uppodStyle.scale) + "px Arial";
        this.ctx.fillText((name == 'hd1' ? uppodStyle.icon2 : uppodStyle.icon), 3 * uppodStyle.scale, 15 * uppodStyle.scale)
    }
    if (name == 'hdselect') {
        this.ctx.fillStyle = uppodStyle.color;
        this.ctx.font = "normal " + (12 * uppodStyle.scale) + "px Arial"
    }
    if (name == 'line' || name == 'volbarline') {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 10 - uppodStyle.h / 2);
        this.ctx.lineTo(bw - 15, 10 - uppodStyle.h / 2);
        this.ctx.lineTo(bw - 5, 10 + uppodStyle.h / 2);
        this.ctx.lineTo(0, 10 + uppodStyle.h / 2);
        this.ctx.lineTo(0, 10 - uppodStyle.h / 2);
        this.ctx.lineWidth = 0.1;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill()
    }
    if (name == 'volbarline_v') {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(bw, 0);
        this.ctx.lineTo(bw, bh);
        this.ctx.lineTo(0, bh);
        this.ctx.lineTo(0, 0);
        this.ctx.lineWidth = 0.1;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill()
    }
    if (name == 'separator') {
        if (uppodStyle.icon == 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(2 * uppodStyle.scale, 0);
            this.ctx.lineTo(2 * uppodStyle.scale, 20 * uppodStyle.scale);
            this.ctx.lineTo(2.5 * uppodStyle.scale, 20 * uppodStyle.scale);
            this.ctx.lineTo(2.5 * uppodStyle.scale, 0);
            this.ctx.lineTo(2 * uppodStyle.scale, 0);
            this.ctx.lineWidth = 0.1;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill()
        }
        if (uppodStyle.icon == 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(4.5 * uppodStyle.scale, 0);
            this.ctx.lineTo(0, 20 * uppodStyle.scale);
            this.ctx.lineTo(0.5 * uppodStyle.scale, 20 * uppodStyle.scale);
            this.ctx.lineTo(5 * uppodStyle.scale, 0);
            this.ctx.lineTo(4.5 * uppodStyle.scale, 0);
            this.ctx.lineWidth = 0.1;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill()
        }
        if (uppodStyle.icon == 2) {
            this.ctx.beginPath();
            this.ctx.moveTo(2 * uppodStyle.scale, 0);
            this.ctx.lineTo(2 * uppodStyle.scale, 20 * uppodStyle.scale);
            this.ctx.lineTo(4 * uppodStyle.scale, 20 * uppodStyle.scale);
            this.ctx.lineTo(4 * uppodStyle.scale, 0);
            this.ctx.lineTo(2 * uppodStyle.scale, 0);
            this.ctx.lineWidth = 0.1;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill()
        }
        if (uppodStyle.icon == 3) {
            this.ctx.beginPath();
            this.ctx.moveTo(2 * uppodStyle.scale, 9 * uppodStyle.scale);
            this.ctx.lineTo(4 * uppodStyle.scale, 9 * uppodStyle.scale);
            this.ctx.lineTo(4 * uppodStyle.scale, 11 * uppodStyle.scale);
            this.ctx.lineTo(2 * uppodStyle.scale, 11 * uppodStyle.scale);
            this.ctx.lineTo(2 * uppodStyle.scale, 9 * uppodStyle.scale);
            this.ctx.lineWidth = 0.1;
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill()
        }
    }
    if (name.indexOf('time') == 0) {
        selfDom.innerHTML = '0:00';
        uppodStyle.icon == 0 ? this.font = (10 * uppodStyle.scale) + "px Verdana" : "";
        uppodStyle.icon == 1 ? this.font = (9 * uppodStyle.scale) + "px Tahoma" : "";
        uppodStyle.icon == 2 ? this.font = (10 * uppodStyle.scale) + "px Arial" : "";
        uppodStyle.icon == 3 ? this.font = (11 * uppodStyle.scale) + "px _serif" : "";
        CSS(this.c, {
            "width": bw,
            "color": "#" + uppodStyle.color,
            "font": this.font,
            "text-align": "center",
            "margin": (10 * uppodStyle.scale - 10) / 2 + "px 0 0 0"
        })
    }
    if (name == 'buffer') {
        selfDom.innerHTML = '';
        CSS(this.c, {
            display: "none",
            "width": bw,
            "color": "#" + uppodStyle.color,
            "font": "10px Arial",
            "text-align": "left"
        })
    }
    selfDom.appendChild(this.canvas);
    var this_w = bw * uppodStyle.scale * (uppodStyle.bg == 1 && uppodStyle.bg_smallicon == 1 ? 0.8 : 1);
    var this_h = bh * uppodStyle.scale * (uppodStyle.bg == 1 && uppodStyle.bg_smallicon == 1 ? 0.8 : 1);
    CSS(this.canvas, {
        'width': this_w,
        'height': this_h,
        'position': 'absolute',
        'top': Math.round(name == 'start' ? bh / 2 - 10 * uppodStyle.scale2 + 2 * uppodStyle.scale : (uppodStyle.bg == 1 && uppodStyle.bg_smallicon == 1 ? 2 * uppodStyle.scale : 0) + uppodStyle.margintop * 1 - uppodStyle.marginbottom * 1),
        'left': Math.round(name == 'start' ? bw / 2 - 10 * uppodStyle.scale2 + 2 * uppodStyle.scale : (uppodStyle.bg == 1 && uppodStyle.bg_smallicon == 1 ? 2 * uppodStyle.scale : 0) + (1 - uppodStyle.scale) * bw / 2),
        'opacity': uppodStyle.alpha,
        'filter': 'alpha(opacity=' + (uppodStyle.alpha * 100) + ')'
    });
    this.w = bw;
    this.h = bh * uppodStyle.scale
};
var EnterFullscreenControl, __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key]
        }

        function ctor() {
            this.constructor = child
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child
    },
    __hasProp = {}.hasOwnProperty;
EnterFullscreenControl = (function(_super) {
    __extends(EnterFullscreenControl, _super);

    function EnterFullscreenControl(uppod) {
        this.element = new Uppod.Element(uppod.vars(), 'full', 20, 20);
        EnterFullscreenControl.__super__.constructor.call(this, 'EnterFullscreen', {
            element: this.element
        });
        this.dom.onclick = uppod.toogleFullscreen;
        this.css({
            'cursor': 'pointer',
            'position': 'absolute',
            'top': this._calcTop(uppod.vars())
        });
        uppod.controls().ControlBar.dom.appendChild(this.dom);
        if (uppod.vars().tip === 1 && this.element.uppodStyle.notip === 0) {
            this.dom.title = this.element.uppodStyle.get('tip', {
                or_lang2: 'full'
            });
            uppod.toolTipOn(this.dom)
        }
    }
    EnterFullscreenControl.prototype._calcTop = function(vars) {
        return Math.floor((vars.cntrloutheight - this.element.h) / 2 + this.element.uppodStyle.margintop - this.element.uppodStyle.marginbottom)
    };
    return EnterFullscreenControl
})(window.Uppod.Control);
window.Uppod.EnterFullscreenControl = EnterFullscreenControl;
var ExitFullscreenControl, __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key]
        }

        function ctor() {
            this.constructor = child
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child
    },
    __hasProp = {}.hasOwnProperty;
ExitFullscreenControl = (function(_super) {
    __extends(ExitFullscreenControl, _super);

    function ExitFullscreenControl(uppod) {
        this.element = new Uppod.Element(uppod.vars(), 'full_back', 20, 20, '', 'full');
        ExitFullscreenControl.__super__.constructor.call(this, 'ExitFullscreen', {
            element: this.element
        });
        this.dom.onclick = uppod.toogleFullscreen;
        this.css({
            'cursor': 'pointer',
            'display': 'none',
            'position': 'absolute',
            'top': this._calcTop(uppod.vars())
        });
        uppod.controls().ControlBar.dom.appendChild(this.dom);
        if (uppod.vars().tip === 1 && this.element.uppodStyle.notip === 0) {
            this.dom.title = this.element.uppodStyle.get('tip', {
                or_lang2: 'full_back'
            });
            uppod.toolTipOn(this.dom)
        }
    }
    ExitFullscreenControl.prototype._calcTop = function(vars) {
        return (vars.cntrloutheight - this.element.h) / 2 + this.element.uppodStyle.margintop - this.element.uppodStyle.marginbottom
    };
    return ExitFullscreenControl
})(window.Uppod.Control);
window.Uppod.ExitFullscreenControl = ExitFullscreenControl;
