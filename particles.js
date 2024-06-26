! function t(e, i, r) {
    function n(s, a) {
        if (!i[s]) {
            if (!e[s]) {
                var h = "function" == typeof require && require;
                if (!a && h) return h(s, !0);
                if (o) return o(s, !0);
                var f = new Error("Cannot find module '" + s + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var u = i[s] = {
                exports: {}
            };
            e[s][0].call(u.exports, function(t) {
                var i = e[s][1][t];
                return n(i ? i : t)
            }, u, u.exports, t, e, i, r)
        }
        return i[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) n(r[s]);
    return n
}({
    1: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, i, r) {
                return i && t(e.prototype, i), r && t(e, r), e
            }
        }();
        e.exports = i = function(t) {
            return function() {
                function e(t, i) {
                    r(this, e), this.maxX = t, this.maxY = i, this.reset()
                }
                return n(e, [{
                    key: "reset",
                    value: function() {
                        this.x = Math.random() * this.maxX, this.y = Math.random() * this.maxY, this.size = Math.random() * (t.size.max - t.size.min) + t.size.min, this.speed = {
                            x: t.speed * (Math.random() - .5),
                            y: t.speed * (Math.random() - .5)
                        }
                    }
                }, {
                    key: "draw",
                    value: function(e) {
                        this.x += this.speed.x, this.y += this.speed.y, (this.x < 0 || this.y < 0 || this.x > this.maxX || this.y > this.maxY) && this.reset(), e.beginPath(), e.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !0), e.fillStyle = t.color, e.fill(), e.closePath()
                    }
                }]), e
            }()
        }
    }, {}],
    2: [function(t, e, i) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };
        window.Particles = function() {
            function e(t, i) {
                for (var r in i) "object" === o(t[r]) && "object" === o(i[r]) ? t[r] = e(t[r], i[r]) : t[r] = i[r];
                return t
            }
            var i = t("./Particle/Particle.js"),
                s = {
                    size: {
                        min: 0,
                        max: 2
                    },
                    density: 1e3,
                    speed: 3,
                    fps: 60,
                    color: "#FFFFFF"
                };
            return function() {
                function t(n, o) {
                    if (r(this, t), !n || "canvas" !== n.tagName.toLowerCase()) throw new Error("Particles: The provided target is invalid.");
                    this.target = n, this.target.width = this.target.offsetWidth, this.target.height = this.target.offsetHeight, this.options = e(s, o), i = i(this.options), this.initialize()
                }
                return n(t, [{
                    key: "start",
                    value: function() {
                        var t = this;
                        console.log("ok"), this.interval = setInterval(function() {
                            return t.draw(t.particles)
                        }, 1e3 / this.options.fps)
                    }
                }, {
                    key: "stop",
                    value: function() {
                        clearInterval(this.interval)
                    }
                }, {
                    key: "initialize",
                    value: function() {
                        this.ctx = this.target.getContext("2d");
                        var t = this.target.offsetWidth * this.target.offsetHeight,
                            e = Math.floor(t / (1 / this.options.density * 1e5) / 50);
                        this.particles = new Array;
                        for (var r = 0; r < e; r++) this.particles.push(new i(this.target.offsetWidth, this.target.offsetHeight));
                        this.start()
                    }
                }, {
                    key: "draw",
                    value: function(t) {
                        this.ctx.clearRect(0, 0, this.target.width, this.target.height);
                        for (var e = 0; e < t.length; e++) t[e].draw(this.ctx)
                    }
                }]), t
            }()
        }()
    }, {
        "./Particle/Particle.js": 1
    }]
}, {}, [2]);