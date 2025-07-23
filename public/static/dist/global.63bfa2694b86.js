(() => {
    var e = {
            1402: (e, t, o) => {
                "use strict";
                o.r(t)
            },
            2167: (e, t, o) => {
                "use strict";

                function l() {
                    window.hasOwnProperty("CMS") && function() {
                        const e = "cms-content-refresh";
                        CMS.$(window).on(e, (() => {
                            $("script[data-is-reload-on-page-edit]").each(((e, t) => {
                                n.call(t)
                            })), window.document.dispatchEvent(new Event("DOMContentLoaded", {
                                bubbles: !0,
                                cancelable: !0
                            }))
                        }))
                    }()
                }

                function n() {
                    const e = $(this).attr("src");
                    $(this).remove(), $("<script>").attr("src", e).appendTo("head")
                }
                o.r(t);
                const i = o(666);
                document.addEventListener("DOMContentLoaded", (function() {
                    l(), document.querySelectorAll(".navbar-collapse-container").forEach((e => {
                            let t = {
                                resizeTimer: null,
                                isMobile: null
                            };
                            t.headerEl = document.querySelector(".header"), t.navbarEl = document.querySelector(".navbar"), t.checkMobile = function() {
                                var o = window.matchMedia("(max-width: 991px)").matches;
                                o && t.setCorrectHeight(), o !== t.isMobile && (t.isMobile = o, o || (e.style.height = ""))
                            }, t.getIntStyle = function(e, t) {
                                return parseInt(getComputedStyle(e, null)[t].replace("px", ""))
                            }, t.setCorrectHeight = function() {
                                e.style.height = window.innerHeight - t.getIntStyle(t.headerEl, "height") - t.getIntStyle(t.navbarEl, "top") + "px"
                            }, window.addEventListener("resize", (function() {
                                clearTimeout(t.resizeTimer), t.resizeTimer = setTimeout((function() {
                                    t.checkMobile()
                                }), 100)
                            })), t.checkMobile()
                        })),
                        $(".dropdown-nav").each((function() {
                            var e = {
                                baseEl: $(this),
                                toggleEl: null,
                                linkEl: null,
                                resizeTimer: null,
                                isMobile: null,
                                checkMobile: null,
                                toggleMenuHandlers: null,
                                stopEventPropagation: null
                            };
                            e.toggleEl = e.baseEl.find('[data-toggle="dropdown"]'), e.linkEl = e.toggleEl.find("a"), e.stopEventPropagation = function(e) {
                                e.stopPropagation()
                            }, e.checkMobile = function() {
                                var t = window.matchMedia("(max-width: 991px)").matches;
                                t !== e.isMobile && (e.isMobile = t, e.toggleMenuHandlers())
                            }, e.toggleMenuHandlers = function() {
                                e.isMobile ? e.toggleEl.removeClass("disabled") : e.toggleEl.addClass("disabled")
                            }, e.linkEl.on("click.dropdownnav", e.stopEventPropagation), $(window).on("resize", (function() {
                                clearTimeout(e.resizeTimer), e.resizeTimer = setTimeout((function() {
                                    e.checkMobile()
                                }), 250)
                            })), e.checkMobile()
                        })), $(".modal").each((function() {
                            var e = {
                                modalEl: $(this),
                                videoEl: null,
                                youtubeVideoEl: null,
                                player: null,
                                videoTextBlockEl: null
                            };
                            e.videoEl = e.modalEl.find("video"), e.youtubeVideoEl = e.modalEl.find("iframe"), e.videoTextBlockEl = e.modalEl.parent(), e.videoEl.length && (e.modalEl.on("shown.bs.modal", (function() {
                                e.videoEl.get(0).play()
                            })), e.modalEl.on("hide.bs.modal", (function() {
                                e.videoEl.get(0).pause()
                            }))), e.youtubeVideoEl.length && e.videoTextBlockEl && e.videoTextBlockEl.one("mouseover", (function() {
                                e.youtubeVideoEl.get(0).setAttribute("src", e.youtubeVideoEl.get(0).parentElement.getAttribute("data-src")), i.load((function(t) {
                                    t.ready((function() {
                                        e.player = new t.Player(e.youtubeVideoEl.get(0).id)
                                    })), e.modalEl.on("shown.bs.modal", (function() {
                                        e.player.playVideo()
                                    })), e.modalEl.on("hide.bs.modal", (function() {
                                        e.player.stopVideo()
                                    }))
                                }))
                            }))
                        })), document.querySelectorAll("[data-lineup-blocks]").forEach((e => {
                            let t = {
                                resizeTimer: null,
                                groupedRows: {},
                                selectors: [],
                                width: 0
                            };
                            t.selectors = JSON.parse(e.dataset.lineupBlocks), t.itemSetEls = t.selectors.map((t => e.querySelectorAll(t))), t.isChanged = function() {
                                let o = parseFloat(getComputedStyle(e, null).width.replace("px", ""));
                                return t.width !== o && (t.width = o, !0)
                            }, t.handleRows = function() {
                                t.isChanged() && t.itemSetEls.forEach((e => {
                                    t.groupedRows = {}, e.forEach((e => {
                                        e.style.height = ""
                                    })), e.forEach((e => {
                                        let o = parseInt(e.getBoundingClientRect().top) + "",
                                            l = Math.round(parseFloat(getComputedStyle(e, null).height.replace("px", "")));
                                        o in t.groupedRows || (t.groupedRows[o] = {
                                            height: 0,
                                            list: []
                                        }), t.groupedRows[o].height < l && (t.groupedRows[o].height = l), t.groupedRows[o].list.push(e)
                                    }));
                                    for (let e in t.groupedRows) 1 < t.groupedRows[e].list.length && t.groupedRows[e].list.forEach((o => {
                                        o.style.height = t.groupedRows[e].height + "px"
                                    }))
                                }))
                            }, window.addEventListener("resize", (function(e) {
                                clearTimeout(t.resizeTimer), t.resizeTimer = setTimeout((function() {
                                    t.handleRows()
                                }), 100)
                            })), t.handleRows()
                        })), $('[data-toggle="tooltip"]').tooltip()
                }), {
                    once: !0
                })
            },
            666: e => {
                ! function(t) {
                    var o = {
                        src: "https://www.youtube.com/iframe_api",
                        loading: !1,
                        loaded: !1,
                        listeners: [],
                        load: function(e) {
                            var o = this;
                            if (this.listeners.push(e), this.loaded) setTimeout((function() {
                                o.done()
                            }));
                            else if (!this.loading) {
                                this.loading = !0, t.onYouTubeIframeAPIReady = function() {
                                    o.loaded = !0, o.done()
                                };
                                var l = document.createElement("script");
                                l.type = "text/javascript", l.src = this.src, document.body.appendChild(l)
                            }
                        },
                        done: function() {
                            for (delete t.onYouTubeIframeAPIReady; this.listeners.length;) this.listeners.pop()(t.YT)
                        }
                    };
                    e.exports ? e.exports = o : t.YouTubeIframeLoader = o
                }(window)
            }
        },
        t = {};

    function o(l) {
        var n = t[l];
        if (void 0 !== n) return n.exports;
        var i = t[l] = {
            exports: {}
        };
        return e[l](i, i.exports, o), i.exports
    }
    o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o(1402), o(2167)
})();

