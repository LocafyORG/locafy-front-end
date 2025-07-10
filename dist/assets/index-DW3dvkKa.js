var Sm = Object.defineProperty;
var gc = (e) => {
  throw TypeError(e);
};
var Em = (e, t, n) =>
  t in e
    ? Sm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var On = (e, t, n) => Em(e, typeof t != "symbol" ? t + "" : t, n),
  rl = (e, t, n) => t.has(e) || gc("Cannot " + n);
var C = (e, t, n) => (
    rl(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  b = (e, t, n) =>
    t.has(e)
      ? gc("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  _ = (e, t, n, r) => (
    rl(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
  ),
  $ = (e, t, n) => (rl(e, t, "access private method"), n);
var po = (e, t, n, r) => ({
  set _(i) {
    _(e, t, i, n);
  },
  get _() {
    return C(e, t, r);
  },
});
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function Rs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var lf = { exports: {} },
  Is = {},
  af = { exports: {} },
  z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var eo = Symbol.for("react.element"),
  Nm = Symbol.for("react.portal"),
  km = Symbol.for("react.fragment"),
  jm = Symbol.for("react.strict_mode"),
  Tm = Symbol.for("react.profiler"),
  Om = Symbol.for("react.provider"),
  Pm = Symbol.for("react.context"),
  Lm = Symbol.for("react.forward_ref"),
  Rm = Symbol.for("react.suspense"),
  Im = Symbol.for("react.memo"),
  Dm = Symbol.for("react.lazy"),
  yc = Symbol.iterator;
function Am(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (yc && e[yc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var uf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  cf = Object.assign,
  df = {};
function Kr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = df),
    (this.updater = n || uf);
}
Kr.prototype.isReactComponent = {};
Kr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Kr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ff() {}
ff.prototype = Kr.prototype;
function qa(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = df),
    (this.updater = n || uf);
}
var Za = (qa.prototype = new ff());
Za.constructor = qa;
cf(Za, Kr.prototype);
Za.isPureReactComponent = !0;
var vc = Array.isArray,
  hf = Object.prototype.hasOwnProperty,
  Ya = { current: null },
  pf = { key: !0, ref: !0, __self: !0, __source: !0 };
function mf(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      hf.call(t, r) && !pf.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var a = Array(l), c = 0; c < l; c++) a[c] = arguments[c + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
  return {
    $$typeof: eo,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Ya.current,
  };
}
function _m(e, t) {
  return {
    $$typeof: eo,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ja(e) {
  return typeof e == "object" && e !== null && e.$$typeof === eo;
}
function bm(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var xc = /\/+/g;
function il(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? bm("" + e.key)
    : t.toString(36);
}
function Fo(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case eo:
          case Nm:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + il(s, 0) : r),
      vc(i)
        ? ((n = ""),
          e != null && (n = e.replace(xc, "$&/") + "/"),
          Fo(i, t, n, "", function (c) {
            return c;
          }))
        : i != null &&
          (Ja(i) &&
            (i = _m(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(xc, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), vc(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var a = r + il(o, l);
      s += Fo(o, t, n, a, i);
    }
  else if (((a = Am(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + il(o, l++)), (s += Fo(o, t, n, a, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return s;
}
function mo(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Fo(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Mm(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Re = { current: null },
  zo = { transition: null },
  Fm = {
    ReactCurrentDispatcher: Re,
    ReactCurrentBatchConfig: zo,
    ReactCurrentOwner: Ya,
  };
function gf() {
  throw Error("act(...) is not supported in production builds of React.");
}
z.Children = {
  map: mo,
  forEach: function (e, t, n) {
    mo(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      mo(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      mo(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ja(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
z.Component = Kr;
z.Fragment = km;
z.Profiler = Tm;
z.PureComponent = qa;
z.StrictMode = jm;
z.Suspense = Rm;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fm;
z.act = gf;
z.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = cf({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = Ya.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      hf.call(t, a) &&
        !pf.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var c = 0; c < a; c++) l[c] = arguments[c + 2];
    r.children = l;
  }
  return { $$typeof: eo, type: e.type, key: i, ref: o, props: r, _owner: s };
};
z.createContext = function (e) {
  return (
    (e = {
      $$typeof: Pm,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Om, _context: e }),
    (e.Consumer = e)
  );
};
z.createElement = mf;
z.createFactory = function (e) {
  var t = mf.bind(null, e);
  return (t.type = e), t;
};
z.createRef = function () {
  return { current: null };
};
z.forwardRef = function (e) {
  return { $$typeof: Lm, render: e };
};
z.isValidElement = Ja;
z.lazy = function (e) {
  return { $$typeof: Dm, _payload: { _status: -1, _result: e }, _init: Mm };
};
z.memo = function (e, t) {
  return { $$typeof: Im, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function (e) {
  var t = zo.transition;
  zo.transition = {};
  try {
    e();
  } finally {
    zo.transition = t;
  }
};
z.unstable_act = gf;
z.useCallback = function (e, t) {
  return Re.current.useCallback(e, t);
};
z.useContext = function (e) {
  return Re.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
  return Re.current.useDeferredValue(e);
};
z.useEffect = function (e, t) {
  return Re.current.useEffect(e, t);
};
z.useId = function () {
  return Re.current.useId();
};
z.useImperativeHandle = function (e, t, n) {
  return Re.current.useImperativeHandle(e, t, n);
};
z.useInsertionEffect = function (e, t) {
  return Re.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function (e, t) {
  return Re.current.useLayoutEffect(e, t);
};
z.useMemo = function (e, t) {
  return Re.current.useMemo(e, t);
};
z.useReducer = function (e, t, n) {
  return Re.current.useReducer(e, t, n);
};
z.useRef = function (e) {
  return Re.current.useRef(e);
};
z.useState = function (e) {
  return Re.current.useState(e);
};
z.useSyncExternalStore = function (e, t, n) {
  return Re.current.useSyncExternalStore(e, t, n);
};
z.useTransition = function () {
  return Re.current.useTransition();
};
z.version = "18.3.1";
af.exports = z;
var f = af.exports;
const A = Rs(f);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zm = f,
  $m = Symbol.for("react.element"),
  Um = Symbol.for("react.fragment"),
  Bm = Object.prototype.hasOwnProperty,
  Hm = zm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Vm = { key: !0, ref: !0, __self: !0, __source: !0 };
function yf(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) Bm.call(t, r) && !Vm.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: $m,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Hm.current,
  };
}
Is.Fragment = Um;
Is.jsx = yf;
Is.jsxs = yf;
lf.exports = Is;
var u = lf.exports,
  vf = { exports: {} },
  Qe = {},
  xf = { exports: {} },
  wf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(I, M) {
    var F = I.length;
    I.push(M);
    e: for (; 0 < F; ) {
      var H = (F - 1) >>> 1,
        G = I[H];
      if (0 < i(G, M)) (I[H] = M), (I[F] = G), (F = H);
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function r(I) {
    if (I.length === 0) return null;
    var M = I[0],
      F = I.pop();
    if (F !== M) {
      I[0] = F;
      e: for (var H = 0, G = I.length, qt = G >>> 1; H < qt; ) {
        var st = 2 * (H + 1) - 1,
          nl = I[st],
          Tn = st + 1,
          ho = I[Tn];
        if (0 > i(nl, F))
          Tn < G && 0 > i(ho, nl)
            ? ((I[H] = ho), (I[Tn] = F), (H = Tn))
            : ((I[H] = nl), (I[st] = F), (H = st));
        else if (Tn < G && 0 > i(ho, F)) (I[H] = ho), (I[Tn] = F), (H = Tn);
        else break e;
      }
    }
    return M;
  }
  function i(I, M) {
    var F = I.sortIndex - M.sortIndex;
    return F !== 0 ? F : I.id - M.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    c = [],
    d = 1,
    m = null,
    p = 3,
    v = !1,
    x = !1,
    w = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(I) {
    for (var M = n(c); M !== null; ) {
      if (M.callback === null) r(c);
      else if (M.startTime <= I)
        r(c), (M.sortIndex = M.expirationTime), t(a, M);
      else break;
      M = n(c);
    }
  }
  function S(I) {
    if (((w = !1), y(I), !x))
      if (n(a) !== null) (x = !0), jn(N);
      else {
        var M = n(c);
        M !== null && er(S, M.startTime - I);
      }
  }
  function N(I, M) {
    (x = !1), w && ((w = !1), h(O), (O = -1)), (v = !0);
    var F = p;
    try {
      for (
        y(M), m = n(a);
        m !== null && (!(m.expirationTime > M) || (I && !Q()));

      ) {
        var H = m.callback;
        if (typeof H == "function") {
          (m.callback = null), (p = m.priorityLevel);
          var G = H(m.expirationTime <= M);
          (M = e.unstable_now()),
            typeof G == "function" ? (m.callback = G) : m === n(a) && r(a),
            y(M);
        } else r(a);
        m = n(a);
      }
      if (m !== null) var qt = !0;
      else {
        var st = n(c);
        st !== null && er(S, st.startTime - M), (qt = !1);
      }
      return qt;
    } finally {
      (m = null), (p = F), (v = !1);
    }
  }
  var j = !1,
    T = null,
    O = -1,
    L = 5,
    R = -1;
  function Q() {
    return !(e.unstable_now() - R < L);
  }
  function ye() {
    if (T !== null) {
      var I = e.unstable_now();
      R = I;
      var M = !0;
      try {
        M = T(!0, I);
      } finally {
        M ? Gt() : ((j = !1), (T = null));
      }
    } else j = !1;
  }
  var Gt;
  if (typeof g == "function")
    Gt = function () {
      g(ye);
    };
  else if (typeof MessageChannel < "u") {
    var co = new MessageChannel(),
      fo = co.port2;
    (co.port1.onmessage = ye),
      (Gt = function () {
        fo.postMessage(null);
      });
  } else
    Gt = function () {
      E(ye, 0);
    };
  function jn(I) {
    (T = I), j || ((j = !0), Gt());
  }
  function er(I, M) {
    O = E(function () {
      I(e.unstable_now());
    }, M);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (I) {
      I.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || v || ((x = !0), jn(N));
    }),
    (e.unstable_forceFrameRate = function (I) {
      0 > I || 125 < I
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (L = 0 < I ? Math.floor(1e3 / I) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (I) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var M = 3;
          break;
        default:
          M = p;
      }
      var F = p;
      p = M;
      try {
        return I();
      } finally {
        p = F;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (I, M) {
      switch (I) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          I = 3;
      }
      var F = p;
      p = I;
      try {
        return M();
      } finally {
        p = F;
      }
    }),
    (e.unstable_scheduleCallback = function (I, M, F) {
      var H = e.unstable_now();
      switch (
        (typeof F == "object" && F !== null
          ? ((F = F.delay), (F = typeof F == "number" && 0 < F ? H + F : H))
          : (F = H),
        I)
      ) {
        case 1:
          var G = -1;
          break;
        case 2:
          G = 250;
          break;
        case 5:
          G = 1073741823;
          break;
        case 4:
          G = 1e4;
          break;
        default:
          G = 5e3;
      }
      return (
        (G = F + G),
        (I = {
          id: d++,
          callback: M,
          priorityLevel: I,
          startTime: F,
          expirationTime: G,
          sortIndex: -1,
        }),
        F > H
          ? ((I.sortIndex = F),
            t(c, I),
            n(a) === null &&
              I === n(c) &&
              (w ? (h(O), (O = -1)) : (w = !0), er(S, F - H)))
          : ((I.sortIndex = G), t(a, I), x || v || ((x = !0), jn(N))),
        I
      );
    }),
    (e.unstable_shouldYield = Q),
    (e.unstable_wrapCallback = function (I) {
      var M = p;
      return function () {
        var F = p;
        p = M;
        try {
          return I.apply(this, arguments);
        } finally {
          p = F;
        }
      };
    });
})(wf);
xf.exports = wf;
var Qm = xf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wm = f,
  Ve = Qm;
function P(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Cf = new Set(),
  Ti = {};
function Jn(e, t) {
  Fr(e, t), Fr(e + "Capture", t);
}
function Fr(e, t) {
  for (Ti[e] = t, e = 0; e < t.length; e++) Cf.add(t[e]);
}
var Ut = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Fl = Object.prototype.hasOwnProperty,
  Km =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  wc = {},
  Cc = {};
function Gm(e) {
  return Fl.call(Cc, e)
    ? !0
    : Fl.call(wc, e)
      ? !1
      : Km.test(e)
        ? (Cc[e] = !0)
        : ((wc[e] = !0), !1);
}
function qm(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Zm(e, t, n, r) {
  if (t === null || typeof t > "u" || qm(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ie(e, t, n, r, i, o, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s);
}
var Ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ce[e] = new Ie(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Ce[t] = new Ie(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Ce[e] = new Ie(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Ce[e] = new Ie(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ce[e] = new Ie(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ce[e] = new Ie(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ce[e] = new Ie(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ce[e] = new Ie(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ce[e] = new Ie(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Xa = /[\-:]([a-z])/g;
function eu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Xa, eu);
    Ce[t] = new Ie(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Xa, eu);
    Ce[t] = new Ie(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Xa, eu);
  Ce[t] = new Ie(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ce[e] = new Ie(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ce.xlinkHref = new Ie(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ce[e] = new Ie(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function tu(e, t, n, r) {
  var i = Ce.hasOwnProperty(t) ? Ce[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zm(t, n, i, r) && (n = null),
    r || i === null
      ? Gm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Wt = Wm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  go = Symbol.for("react.element"),
  sr = Symbol.for("react.portal"),
  lr = Symbol.for("react.fragment"),
  nu = Symbol.for("react.strict_mode"),
  zl = Symbol.for("react.profiler"),
  Sf = Symbol.for("react.provider"),
  Ef = Symbol.for("react.context"),
  ru = Symbol.for("react.forward_ref"),
  $l = Symbol.for("react.suspense"),
  Ul = Symbol.for("react.suspense_list"),
  iu = Symbol.for("react.memo"),
  Jt = Symbol.for("react.lazy"),
  Nf = Symbol.for("react.offscreen"),
  Sc = Symbol.iterator;
function ti(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Sc && e[Sc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ne = Object.assign,
  ol;
function ci(e) {
  if (ol === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ol = (t && t[1]) || "";
    }
  return (
    `
` +
    ol +
    e
  );
}
var sl = !1;
function ll(e, t) {
  if (!e || sl) return "";
  sl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var i = c.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          l = o.length - 1;
        1 <= s && 0 <= l && i[s] !== o[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (i[s] !== o[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || i[s] !== o[l])) {
                var a =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    (sl = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? ci(e) : "";
}
function Ym(e) {
  switch (e.tag) {
    case 5:
      return ci(e.type);
    case 16:
      return ci("Lazy");
    case 13:
      return ci("Suspense");
    case 19:
      return ci("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = ll(e.type, !1)), e;
    case 11:
      return (e = ll(e.type.render, !1)), e;
    case 1:
      return (e = ll(e.type, !0)), e;
    default:
      return "";
  }
}
function Bl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case lr:
      return "Fragment";
    case sr:
      return "Portal";
    case zl:
      return "Profiler";
    case nu:
      return "StrictMode";
    case $l:
      return "Suspense";
    case Ul:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ef:
        return (e.displayName || "Context") + ".Consumer";
      case Sf:
        return (e._context.displayName || "Context") + ".Provider";
      case ru:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case iu:
        return (
          (t = e.displayName || null), t !== null ? t : Bl(e.type) || "Memo"
        );
      case Jt:
        (t = e._payload), (e = e._init);
        try {
          return Bl(e(t));
        } catch {}
    }
  return null;
}
function Jm(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Bl(t);
    case 8:
      return t === nu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function wn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function kf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Xm(e) {
  var t = kf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = "" + s), o.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function yo(e) {
  e._valueTracker || (e._valueTracker = Xm(e));
}
function jf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = kf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Xo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Hl(e, t) {
  var n = t.checked;
  return ne({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Ec(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = wn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Tf(e, t) {
  (t = t.checked), t != null && tu(e, "checked", t, !1);
}
function Vl(e, t) {
  Tf(e, t);
  var n = wn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Ql(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ql(e, t.type, wn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Nc(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Ql(e, t, n) {
  (t !== "number" || Xo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var di = Array.isArray;
function vr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + wn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Wl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(P(91));
  return ne({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function kc(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(P(92));
      if (di(n)) {
        if (1 < n.length) throw Error(P(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: wn(n) };
}
function Of(e, t) {
  var n = wn(t.value),
    r = wn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function jc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Pf(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Kl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Pf(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var vo,
  Lf = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        vo = vo || document.createElement("div"),
          vo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = vo.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Oi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var yi = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  eg = ["Webkit", "ms", "Moz", "O"];
Object.keys(yi).forEach(function (e) {
  eg.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (yi[t] = yi[e]);
  });
});
function Rf(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (yi.hasOwnProperty(e) && yi[e])
      ? ("" + t).trim()
      : t + "px";
}
function If(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Rf(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var tg = ne(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Gl(e, t) {
  if (t) {
    if (tg[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(P(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(P(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(P(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(P(62));
  }
}
function ql(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Zl = null;
function ou(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Yl = null,
  xr = null,
  wr = null;
function Tc(e) {
  if ((e = ro(e))) {
    if (typeof Yl != "function") throw Error(P(280));
    var t = e.stateNode;
    t && ((t = Ms(t)), Yl(e.stateNode, e.type, t));
  }
}
function Df(e) {
  xr ? (wr ? wr.push(e) : (wr = [e])) : (xr = e);
}
function Af() {
  if (xr) {
    var e = xr,
      t = wr;
    if (((wr = xr = null), Tc(e), t)) for (e = 0; e < t.length; e++) Tc(t[e]);
  }
}
function _f(e, t) {
  return e(t);
}
function bf() {}
var al = !1;
function Mf(e, t, n) {
  if (al) return e(t, n);
  al = !0;
  try {
    return _f(e, t, n);
  } finally {
    (al = !1), (xr !== null || wr !== null) && (bf(), Af());
  }
}
function Pi(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ms(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(P(231, t, typeof n));
  return n;
}
var Jl = !1;
if (Ut)
  try {
    var ni = {};
    Object.defineProperty(ni, "passive", {
      get: function () {
        Jl = !0;
      },
    }),
      window.addEventListener("test", ni, ni),
      window.removeEventListener("test", ni, ni);
  } catch {
    Jl = !1;
  }
function ng(e, t, n, r, i, o, s, l, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (d) {
    this.onError(d);
  }
}
var vi = !1,
  es = null,
  ts = !1,
  Xl = null,
  rg = {
    onError: function (e) {
      (vi = !0), (es = e);
    },
  };
function ig(e, t, n, r, i, o, s, l, a) {
  (vi = !1), (es = null), ng.apply(rg, arguments);
}
function og(e, t, n, r, i, o, s, l, a) {
  if ((ig.apply(this, arguments), vi)) {
    if (vi) {
      var c = es;
      (vi = !1), (es = null);
    } else throw Error(P(198));
    ts || ((ts = !0), (Xl = c));
  }
}
function Xn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ff(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Oc(e) {
  if (Xn(e) !== e) throw Error(P(188));
}
function sg(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Xn(e)), t === null)) throw Error(P(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Oc(i), e;
        if (o === r) return Oc(i), t;
        o = o.sibling;
      }
      throw Error(P(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var s = !1, l = i.child; l; ) {
        if (l === n) {
          (s = !0), (n = i), (r = o);
          break;
        }
        if (l === r) {
          (s = !0), (r = i), (n = o);
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = o.child; l; ) {
          if (l === n) {
            (s = !0), (n = o), (r = i);
            break;
          }
          if (l === r) {
            (s = !0), (r = o), (n = i);
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(P(189));
      }
    }
    if (n.alternate !== r) throw Error(P(190));
  }
  if (n.tag !== 3) throw Error(P(188));
  return n.stateNode.current === n ? e : t;
}
function zf(e) {
  return (e = sg(e)), e !== null ? $f(e) : null;
}
function $f(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = $f(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Uf = Ve.unstable_scheduleCallback,
  Pc = Ve.unstable_cancelCallback,
  lg = Ve.unstable_shouldYield,
  ag = Ve.unstable_requestPaint,
  ue = Ve.unstable_now,
  ug = Ve.unstable_getCurrentPriorityLevel,
  su = Ve.unstable_ImmediatePriority,
  Bf = Ve.unstable_UserBlockingPriority,
  ns = Ve.unstable_NormalPriority,
  cg = Ve.unstable_LowPriority,
  Hf = Ve.unstable_IdlePriority,
  Ds = null,
  Tt = null;
function dg(e) {
  if (Tt && typeof Tt.onCommitFiberRoot == "function")
    try {
      Tt.onCommitFiberRoot(Ds, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var ht = Math.clz32 ? Math.clz32 : pg,
  fg = Math.log,
  hg = Math.LN2;
function pg(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((fg(e) / hg) | 0)) | 0;
}
var xo = 64,
  wo = 4194304;
function fi(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function rs(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~i;
    l !== 0 ? (r = fi(l)) : ((o &= s), o !== 0 && (r = fi(o)));
  } else (s = n & ~i), s !== 0 ? (r = fi(s)) : o !== 0 && (r = fi(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - ht(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function mg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function gg(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - ht(o),
      l = 1 << s,
      a = i[s];
    a === -1
      ? (!(l & n) || l & r) && (i[s] = mg(l, t))
      : a <= t && (e.expiredLanes |= l),
      (o &= ~l);
  }
}
function ea(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Vf() {
  var e = xo;
  return (xo <<= 1), !(xo & 4194240) && (xo = 64), e;
}
function ul(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function to(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - ht(t)),
    (e[t] = n);
}
function yg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - ht(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function lu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - ht(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var K = 0;
function Qf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Wf,
  au,
  Kf,
  Gf,
  qf,
  ta = !1,
  Co = [],
  fn = null,
  hn = null,
  pn = null,
  Li = new Map(),
  Ri = new Map(),
  en = [],
  vg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Lc(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      fn = null;
      break;
    case "dragenter":
    case "dragleave":
      hn = null;
      break;
    case "mouseover":
    case "mouseout":
      pn = null;
      break;
    case "pointerover":
    case "pointerout":
      Li.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ri.delete(t.pointerId);
  }
}
function ri(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = ro(t)), t !== null && au(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function xg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (fn = ri(fn, e, t, n, r, i)), !0;
    case "dragenter":
      return (hn = ri(hn, e, t, n, r, i)), !0;
    case "mouseover":
      return (pn = ri(pn, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return Li.set(o, ri(Li.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), Ri.set(o, ri(Ri.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Zf(e) {
  var t = An(e.target);
  if (t !== null) {
    var n = Xn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Ff(n)), t !== null)) {
          (e.blockedOn = t),
            qf(e.priority, function () {
              Kf(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function $o(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = na(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Zl = r), n.target.dispatchEvent(r), (Zl = null);
    } else return (t = ro(n)), t !== null && au(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Rc(e, t, n) {
  $o(e) && n.delete(t);
}
function wg() {
  (ta = !1),
    fn !== null && $o(fn) && (fn = null),
    hn !== null && $o(hn) && (hn = null),
    pn !== null && $o(pn) && (pn = null),
    Li.forEach(Rc),
    Ri.forEach(Rc);
}
function ii(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ta ||
      ((ta = !0),
      Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority, wg)));
}
function Ii(e) {
  function t(i) {
    return ii(i, e);
  }
  if (0 < Co.length) {
    ii(Co[0], e);
    for (var n = 1; n < Co.length; n++) {
      var r = Co[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    fn !== null && ii(fn, e),
      hn !== null && ii(hn, e),
      pn !== null && ii(pn, e),
      Li.forEach(t),
      Ri.forEach(t),
      n = 0;
    n < en.length;
    n++
  )
    (r = en[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < en.length && ((n = en[0]), n.blockedOn === null); )
    Zf(n), n.blockedOn === null && en.shift();
}
var Cr = Wt.ReactCurrentBatchConfig,
  is = !0;
function Cg(e, t, n, r) {
  var i = K,
    o = Cr.transition;
  Cr.transition = null;
  try {
    (K = 1), uu(e, t, n, r);
  } finally {
    (K = i), (Cr.transition = o);
  }
}
function Sg(e, t, n, r) {
  var i = K,
    o = Cr.transition;
  Cr.transition = null;
  try {
    (K = 4), uu(e, t, n, r);
  } finally {
    (K = i), (Cr.transition = o);
  }
}
function uu(e, t, n, r) {
  if (is) {
    var i = na(e, t, n, r);
    if (i === null) xl(e, t, r, os, n), Lc(e, r);
    else if (xg(i, e, t, n, r)) r.stopPropagation();
    else if ((Lc(e, r), t & 4 && -1 < vg.indexOf(e))) {
      for (; i !== null; ) {
        var o = ro(i);
        if (
          (o !== null && Wf(o),
          (o = na(e, t, n, r)),
          o === null && xl(e, t, r, os, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else xl(e, t, r, null, n);
  }
}
var os = null;
function na(e, t, n, r) {
  if (((os = null), (e = ou(r)), (e = An(e)), e !== null))
    if (((t = Xn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Ff(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (os = e), null;
}
function Yf(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ug()) {
        case su:
          return 1;
        case Bf:
          return 4;
        case ns:
        case cg:
          return 16;
        case Hf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var cn = null,
  cu = null,
  Uo = null;
function Jf() {
  if (Uo) return Uo;
  var e,
    t = cu,
    n = t.length,
    r,
    i = "value" in cn ? cn.value : cn.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (Uo = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Bo(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function So() {
  return !0;
}
function Ic() {
  return !1;
}
function We(e) {
  function t(n, r, i, o, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(o) : o[l]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? So
        : Ic),
      (this.isPropagationStopped = Ic),
      this
    );
  }
  return (
    ne(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = So));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = So));
      },
      persist: function () {},
      isPersistent: So,
    }),
    t
  );
}
var Gr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  du = We(Gr),
  no = ne({}, Gr, { view: 0, detail: 0 }),
  Eg = We(no),
  cl,
  dl,
  oi,
  As = ne({}, no, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: fu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== oi &&
            (oi && e.type === "mousemove"
              ? ((cl = e.screenX - oi.screenX), (dl = e.screenY - oi.screenY))
              : (dl = cl = 0),
            (oi = e)),
          cl);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : dl;
    },
  }),
  Dc = We(As),
  Ng = ne({}, As, { dataTransfer: 0 }),
  kg = We(Ng),
  jg = ne({}, no, { relatedTarget: 0 }),
  fl = We(jg),
  Tg = ne({}, Gr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Og = We(Tg),
  Pg = ne({}, Gr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Lg = We(Pg),
  Rg = ne({}, Gr, { data: 0 }),
  Ac = We(Rg),
  Ig = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Dg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ag = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function _g(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ag[e]) ? !!t[e] : !1;
}
function fu() {
  return _g;
}
var bg = ne({}, no, {
    key: function (e) {
      if (e.key) {
        var t = Ig[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Bo(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Dg[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fu,
    charCode: function (e) {
      return e.type === "keypress" ? Bo(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Bo(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Mg = We(bg),
  Fg = ne({}, As, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  _c = We(Fg),
  zg = ne({}, no, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fu,
  }),
  $g = We(zg),
  Ug = ne({}, Gr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bg = We(Ug),
  Hg = ne({}, As, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Vg = We(Hg),
  Qg = [9, 13, 27, 32],
  hu = Ut && "CompositionEvent" in window,
  xi = null;
Ut && "documentMode" in document && (xi = document.documentMode);
var Wg = Ut && "TextEvent" in window && !xi,
  Xf = Ut && (!hu || (xi && 8 < xi && 11 >= xi)),
  bc = " ",
  Mc = !1;
function eh(e, t) {
  switch (e) {
    case "keyup":
      return Qg.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function th(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var ar = !1;
function Kg(e, t) {
  switch (e) {
    case "compositionend":
      return th(t);
    case "keypress":
      return t.which !== 32 ? null : ((Mc = !0), bc);
    case "textInput":
      return (e = t.data), e === bc && Mc ? null : e;
    default:
      return null;
  }
}
function Gg(e, t) {
  if (ar)
    return e === "compositionend" || (!hu && eh(e, t))
      ? ((e = Jf()), (Uo = cu = cn = null), (ar = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Xf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var qg = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Fc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!qg[e.type] : t === "textarea";
}
function nh(e, t, n, r) {
  Df(r),
    (t = ss(t, "onChange")),
    0 < t.length &&
      ((n = new du("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var wi = null,
  Di = null;
function Zg(e) {
  hh(e, 0);
}
function _s(e) {
  var t = dr(e);
  if (jf(t)) return e;
}
function Yg(e, t) {
  if (e === "change") return t;
}
var rh = !1;
if (Ut) {
  var hl;
  if (Ut) {
    var pl = "oninput" in document;
    if (!pl) {
      var zc = document.createElement("div");
      zc.setAttribute("oninput", "return;"),
        (pl = typeof zc.oninput == "function");
    }
    hl = pl;
  } else hl = !1;
  rh = hl && (!document.documentMode || 9 < document.documentMode);
}
function $c() {
  wi && (wi.detachEvent("onpropertychange", ih), (Di = wi = null));
}
function ih(e) {
  if (e.propertyName === "value" && _s(Di)) {
    var t = [];
    nh(t, Di, e, ou(e)), Mf(Zg, t);
  }
}
function Jg(e, t, n) {
  e === "focusin"
    ? ($c(), (wi = t), (Di = n), wi.attachEvent("onpropertychange", ih))
    : e === "focusout" && $c();
}
function Xg(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return _s(Di);
}
function ey(e, t) {
  if (e === "click") return _s(t);
}
function ty(e, t) {
  if (e === "input" || e === "change") return _s(t);
}
function ny(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var mt = typeof Object.is == "function" ? Object.is : ny;
function Ai(e, t) {
  if (mt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Fl.call(t, i) || !mt(e[i], t[i])) return !1;
  }
  return !0;
}
function Uc(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Bc(e, t) {
  var n = Uc(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Uc(n);
  }
}
function oh(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? oh(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function sh() {
  for (var e = window, t = Xo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Xo(e.document);
  }
  return t;
}
function pu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function ry(e) {
  var t = sh(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    oh(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && pu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Bc(n, o));
        var s = Bc(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var iy = Ut && "documentMode" in document && 11 >= document.documentMode,
  ur = null,
  ra = null,
  Ci = null,
  ia = !1;
function Hc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ia ||
    ur == null ||
    ur !== Xo(r) ||
    ((r = ur),
    "selectionStart" in r && pu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Ci && Ai(Ci, r)) ||
      ((Ci = r),
      (r = ss(ra, "onSelect")),
      0 < r.length &&
        ((t = new du("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = ur))));
}
function Eo(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var cr = {
    animationend: Eo("Animation", "AnimationEnd"),
    animationiteration: Eo("Animation", "AnimationIteration"),
    animationstart: Eo("Animation", "AnimationStart"),
    transitionend: Eo("Transition", "TransitionEnd"),
  },
  ml = {},
  lh = {};
Ut &&
  ((lh = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete cr.animationend.animation,
    delete cr.animationiteration.animation,
    delete cr.animationstart.animation),
  "TransitionEvent" in window || delete cr.transitionend.transition);
function bs(e) {
  if (ml[e]) return ml[e];
  if (!cr[e]) return e;
  var t = cr[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in lh) return (ml[e] = t[n]);
  return e;
}
var ah = bs("animationend"),
  uh = bs("animationiteration"),
  ch = bs("animationstart"),
  dh = bs("transitionend"),
  fh = new Map(),
  Vc =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function En(e, t) {
  fh.set(e, t), Jn(t, [e]);
}
for (var gl = 0; gl < Vc.length; gl++) {
  var yl = Vc[gl],
    oy = yl.toLowerCase(),
    sy = yl[0].toUpperCase() + yl.slice(1);
  En(oy, "on" + sy);
}
En(ah, "onAnimationEnd");
En(uh, "onAnimationIteration");
En(ch, "onAnimationStart");
En("dblclick", "onDoubleClick");
En("focusin", "onFocus");
En("focusout", "onBlur");
En(dh, "onTransitionEnd");
Fr("onMouseEnter", ["mouseout", "mouseover"]);
Fr("onMouseLeave", ["mouseout", "mouseover"]);
Fr("onPointerEnter", ["pointerout", "pointerover"]);
Fr("onPointerLeave", ["pointerout", "pointerover"]);
Jn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Jn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Jn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Jn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Jn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var hi =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ly = new Set("cancel close invalid load scroll toggle".split(" ").concat(hi));
function Qc(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), og(r, t, void 0, e), (e.currentTarget = null);
}
function hh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            c = l.currentTarget;
          if (((l = l.listener), a !== o && i.isPropagationStopped())) break e;
          Qc(i, l, c), (o = a);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (c = l.currentTarget),
            (l = l.listener),
            a !== o && i.isPropagationStopped())
          )
            break e;
          Qc(i, l, c), (o = a);
        }
    }
  }
  if (ts) throw ((e = Xl), (ts = !1), (Xl = null), e);
}
function Z(e, t) {
  var n = t[ua];
  n === void 0 && (n = t[ua] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ph(t, e, 2, !1), n.add(r));
}
function vl(e, t, n) {
  var r = 0;
  t && (r |= 4), ph(n, e, r, t);
}
var No = "_reactListening" + Math.random().toString(36).slice(2);
function _i(e) {
  if (!e[No]) {
    (e[No] = !0),
      Cf.forEach(function (n) {
        n !== "selectionchange" && (ly.has(n) || vl(n, !1, e), vl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[No] || ((t[No] = !0), vl("selectionchange", !1, t));
  }
}
function ph(e, t, n, r) {
  switch (Yf(t)) {
    case 1:
      var i = Cg;
      break;
    case 4:
      i = Sg;
      break;
    default:
      i = uu;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Jl ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1);
}
function xl(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = An(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = o = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Mf(function () {
    var c = o,
      d = ou(n),
      m = [];
    e: {
      var p = fh.get(e);
      if (p !== void 0) {
        var v = du,
          x = e;
        switch (e) {
          case "keypress":
            if (Bo(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = Mg;
            break;
          case "focusin":
            (x = "focus"), (v = fl);
            break;
          case "focusout":
            (x = "blur"), (v = fl);
            break;
          case "beforeblur":
          case "afterblur":
            v = fl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Dc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = kg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = $g;
            break;
          case ah:
          case uh:
          case ch:
            v = Og;
            break;
          case dh:
            v = Bg;
            break;
          case "scroll":
            v = Eg;
            break;
          case "wheel":
            v = Vg;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Lg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = _c;
        }
        var w = (t & 4) !== 0,
          E = !w && e === "scroll",
          h = w ? (p !== null ? p + "Capture" : null) : p;
        w = [];
        for (var g = c, y; g !== null; ) {
          y = g;
          var S = y.stateNode;
          if (
            (y.tag === 5 &&
              S !== null &&
              ((y = S),
              h !== null && ((S = Pi(g, h)), S != null && w.push(bi(g, S, y)))),
            E)
          )
            break;
          g = g.return;
        }
        0 < w.length &&
          ((p = new v(p, x, null, n, d)), m.push({ event: p, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          p &&
            n !== Zl &&
            (x = n.relatedTarget || n.fromElement) &&
            (An(x) || x[Bt]))
        )
          break e;
        if (
          (v || p) &&
          ((p =
            d.window === d
              ? d
              : (p = d.ownerDocument)
                ? p.defaultView || p.parentWindow
                : window),
          v
            ? ((x = n.relatedTarget || n.toElement),
              (v = c),
              (x = x ? An(x) : null),
              x !== null &&
                ((E = Xn(x)), x !== E || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((v = null), (x = c)),
          v !== x)
        ) {
          if (
            ((w = Dc),
            (S = "onMouseLeave"),
            (h = "onMouseEnter"),
            (g = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = _c),
              (S = "onPointerLeave"),
              (h = "onPointerEnter"),
              (g = "pointer")),
            (E = v == null ? p : dr(v)),
            (y = x == null ? p : dr(x)),
            (p = new w(S, g + "leave", v, n, d)),
            (p.target = E),
            (p.relatedTarget = y),
            (S = null),
            An(d) === c &&
              ((w = new w(h, g + "enter", x, n, d)),
              (w.target = y),
              (w.relatedTarget = E),
              (S = w)),
            (E = S),
            v && x)
          )
            t: {
              for (w = v, h = x, g = 0, y = w; y; y = tr(y)) g++;
              for (y = 0, S = h; S; S = tr(S)) y++;
              for (; 0 < g - y; ) (w = tr(w)), g--;
              for (; 0 < y - g; ) (h = tr(h)), y--;
              for (; g--; ) {
                if (w === h || (h !== null && w === h.alternate)) break t;
                (w = tr(w)), (h = tr(h));
              }
              w = null;
            }
          else w = null;
          v !== null && Wc(m, p, v, w, !1),
            x !== null && E !== null && Wc(m, E, x, w, !0);
        }
      }
      e: {
        if (
          ((p = c ? dr(c) : window),
          (v = p.nodeName && p.nodeName.toLowerCase()),
          v === "select" || (v === "input" && p.type === "file"))
        )
          var N = Yg;
        else if (Fc(p))
          if (rh) N = ty;
          else {
            N = Xg;
            var j = Jg;
          }
        else
          (v = p.nodeName) &&
            v.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            (N = ey);
        if (N && (N = N(e, c))) {
          nh(m, N, n, d);
          break e;
        }
        j && j(e, p, c),
          e === "focusout" &&
            (j = p._wrapperState) &&
            j.controlled &&
            p.type === "number" &&
            Ql(p, "number", p.value);
      }
      switch (((j = c ? dr(c) : window), e)) {
        case "focusin":
          (Fc(j) || j.contentEditable === "true") &&
            ((ur = j), (ra = c), (Ci = null));
          break;
        case "focusout":
          Ci = ra = ur = null;
          break;
        case "mousedown":
          ia = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (ia = !1), Hc(m, n, d);
          break;
        case "selectionchange":
          if (iy) break;
        case "keydown":
        case "keyup":
          Hc(m, n, d);
      }
      var T;
      if (hu)
        e: {
          switch (e) {
            case "compositionstart":
              var O = "onCompositionStart";
              break e;
            case "compositionend":
              O = "onCompositionEnd";
              break e;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break e;
          }
          O = void 0;
        }
      else
        ar
          ? eh(e, n) && (O = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
      O &&
        (Xf &&
          n.locale !== "ko" &&
          (ar || O !== "onCompositionStart"
            ? O === "onCompositionEnd" && ar && (T = Jf())
            : ((cn = d),
              (cu = "value" in cn ? cn.value : cn.textContent),
              (ar = !0))),
        (j = ss(c, O)),
        0 < j.length &&
          ((O = new Ac(O, e, null, n, d)),
          m.push({ event: O, listeners: j }),
          T ? (O.data = T) : ((T = th(n)), T !== null && (O.data = T)))),
        (T = Wg ? Kg(e, n) : Gg(e, n)) &&
          ((c = ss(c, "onBeforeInput")),
          0 < c.length &&
            ((d = new Ac("onBeforeInput", "beforeinput", null, n, d)),
            m.push({ event: d, listeners: c }),
            (d.data = T)));
    }
    hh(m, t);
  });
}
function bi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ss(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Pi(e, n)),
      o != null && r.unshift(bi(e, o, i)),
      (o = Pi(e, t)),
      o != null && r.push(bi(e, o, i))),
      (e = e.return);
  }
  return r;
}
function tr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Wc(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      c = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      c !== null &&
      ((l = c),
      i
        ? ((a = Pi(n, o)), a != null && s.unshift(bi(n, a, l)))
        : i || ((a = Pi(n, o)), a != null && s.push(bi(n, a, l)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var ay = /\r\n?/g,
  uy = /\u0000|\uFFFD/g;
function Kc(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      ay,
      `
`,
    )
    .replace(uy, "");
}
function ko(e, t, n) {
  if (((t = Kc(t)), Kc(e) !== t && n)) throw Error(P(425));
}
function ls() {}
var oa = null,
  sa = null;
function la(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var aa = typeof setTimeout == "function" ? setTimeout : void 0,
  cy = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Gc = typeof Promise == "function" ? Promise : void 0,
  dy =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Gc < "u"
        ? function (e) {
            return Gc.resolve(null).then(e).catch(fy);
          }
        : aa;
function fy(e) {
  setTimeout(function () {
    throw e;
  });
}
function wl(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), Ii(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  Ii(t);
}
function mn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function qc(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var qr = Math.random().toString(36).slice(2),
  jt = "__reactFiber$" + qr,
  Mi = "__reactProps$" + qr,
  Bt = "__reactContainer$" + qr,
  ua = "__reactEvents$" + qr,
  hy = "__reactListeners$" + qr,
  py = "__reactHandles$" + qr;
function An(e) {
  var t = e[jt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Bt] || n[jt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = qc(e); e !== null; ) {
          if ((n = e[jt])) return n;
          e = qc(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ro(e) {
  return (
    (e = e[jt] || e[Bt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function dr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(P(33));
}
function Ms(e) {
  return e[Mi] || null;
}
var ca = [],
  fr = -1;
function Nn(e) {
  return { current: e };
}
function Y(e) {
  0 > fr || ((e.current = ca[fr]), (ca[fr] = null), fr--);
}
function q(e, t) {
  fr++, (ca[fr] = e.current), (e.current = t);
}
var Cn = {},
  je = Nn(Cn),
  be = Nn(!1),
  Wn = Cn;
function zr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Cn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Me(e) {
  return (e = e.childContextTypes), e != null;
}
function as() {
  Y(be), Y(je);
}
function Zc(e, t, n) {
  if (je.current !== Cn) throw Error(P(168));
  q(je, t), q(be, n);
}
function mh(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(P(108, Jm(e) || "Unknown", i));
  return ne({}, n, r);
}
function us(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Cn),
    (Wn = je.current),
    q(je, e),
    q(be, be.current),
    !0
  );
}
function Yc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(P(169));
  n
    ? ((e = mh(e, t, Wn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Y(be),
      Y(je),
      q(je, e))
    : Y(be),
    q(be, n);
}
var At = null,
  Fs = !1,
  Cl = !1;
function gh(e) {
  At === null ? (At = [e]) : At.push(e);
}
function my(e) {
  (Fs = !0), gh(e);
}
function kn() {
  if (!Cl && At !== null) {
    Cl = !0;
    var e = 0,
      t = K;
    try {
      var n = At;
      for (K = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (At = null), (Fs = !1);
    } catch (i) {
      throw (At !== null && (At = At.slice(e + 1)), Uf(su, kn), i);
    } finally {
      (K = t), (Cl = !1);
    }
  }
  return null;
}
var hr = [],
  pr = 0,
  cs = null,
  ds = 0,
  Ze = [],
  Ye = 0,
  Kn = null,
  bt = 1,
  Mt = "";
function Pn(e, t) {
  (hr[pr++] = ds), (hr[pr++] = cs), (cs = e), (ds = t);
}
function yh(e, t, n) {
  (Ze[Ye++] = bt), (Ze[Ye++] = Mt), (Ze[Ye++] = Kn), (Kn = e);
  var r = bt;
  e = Mt;
  var i = 32 - ht(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - ht(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    (o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (bt = (1 << (32 - ht(t) + i)) | (n << i) | r),
      (Mt = o + e);
  } else (bt = (1 << o) | (n << i) | r), (Mt = e);
}
function mu(e) {
  e.return !== null && (Pn(e, 1), yh(e, 1, 0));
}
function gu(e) {
  for (; e === cs; )
    (cs = hr[--pr]), (hr[pr] = null), (ds = hr[--pr]), (hr[pr] = null);
  for (; e === Kn; )
    (Kn = Ze[--Ye]),
      (Ze[Ye] = null),
      (Mt = Ze[--Ye]),
      (Ze[Ye] = null),
      (bt = Ze[--Ye]),
      (Ze[Ye] = null);
}
var He = null,
  Be = null,
  J = !1,
  dt = null;
function vh(e, t) {
  var n = Xe(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Jc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (He = e), (Be = mn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (He = e), (Be = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Kn !== null ? { id: bt, overflow: Mt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Xe(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (He = e),
            (Be = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function da(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function fa(e) {
  if (J) {
    var t = Be;
    if (t) {
      var n = t;
      if (!Jc(e, t)) {
        if (da(e)) throw Error(P(418));
        t = mn(n.nextSibling);
        var r = He;
        t && Jc(e, t)
          ? vh(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (J = !1), (He = e));
      }
    } else {
      if (da(e)) throw Error(P(418));
      (e.flags = (e.flags & -4097) | 2), (J = !1), (He = e);
    }
  }
}
function Xc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  He = e;
}
function jo(e) {
  if (e !== He) return !1;
  if (!J) return Xc(e), (J = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !la(e.type, e.memoizedProps))),
    t && (t = Be))
  ) {
    if (da(e)) throw (xh(), Error(P(418)));
    for (; t; ) vh(e, t), (t = mn(t.nextSibling));
  }
  if ((Xc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(P(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Be = mn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Be = null;
    }
  } else Be = He ? mn(e.stateNode.nextSibling) : null;
  return !0;
}
function xh() {
  for (var e = Be; e; ) e = mn(e.nextSibling);
}
function $r() {
  (Be = He = null), (J = !1);
}
function yu(e) {
  dt === null ? (dt = [e]) : dt.push(e);
}
var gy = Wt.ReactCurrentBatchConfig;
function si(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(P(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(P(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var l = i.refs;
            s === null ? delete l[o] : (l[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(P(284));
    if (!n._owner) throw Error(P(290, e));
  }
  return e;
}
function To(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      P(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function ed(e) {
  var t = e._init;
  return t(e._payload);
}
function wh(e) {
  function t(h, g) {
    if (e) {
      var y = h.deletions;
      y === null ? ((h.deletions = [g]), (h.flags |= 16)) : y.push(g);
    }
  }
  function n(h, g) {
    if (!e) return null;
    for (; g !== null; ) t(h, g), (g = g.sibling);
    return null;
  }
  function r(h, g) {
    for (h = new Map(); g !== null; )
      g.key !== null ? h.set(g.key, g) : h.set(g.index, g), (g = g.sibling);
    return h;
  }
  function i(h, g) {
    return (h = xn(h, g)), (h.index = 0), (h.sibling = null), h;
  }
  function o(h, g, y) {
    return (
      (h.index = y),
      e
        ? ((y = h.alternate),
          y !== null
            ? ((y = y.index), y < g ? ((h.flags |= 2), g) : y)
            : ((h.flags |= 2), g))
        : ((h.flags |= 1048576), g)
    );
  }
  function s(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function l(h, g, y, S) {
    return g === null || g.tag !== 6
      ? ((g = Ol(y, h.mode, S)), (g.return = h), g)
      : ((g = i(g, y)), (g.return = h), g);
  }
  function a(h, g, y, S) {
    var N = y.type;
    return N === lr
      ? d(h, g, y.props.children, S, y.key)
      : g !== null &&
          (g.elementType === N ||
            (typeof N == "object" &&
              N !== null &&
              N.$$typeof === Jt &&
              ed(N) === g.type))
        ? ((S = i(g, y.props)), (S.ref = si(h, g, y)), (S.return = h), S)
        : ((S = qo(y.type, y.key, y.props, null, h.mode, S)),
          (S.ref = si(h, g, y)),
          (S.return = h),
          S);
  }
  function c(h, g, y, S) {
    return g === null ||
      g.tag !== 4 ||
      g.stateNode.containerInfo !== y.containerInfo ||
      g.stateNode.implementation !== y.implementation
      ? ((g = Pl(y, h.mode, S)), (g.return = h), g)
      : ((g = i(g, y.children || [])), (g.return = h), g);
  }
  function d(h, g, y, S, N) {
    return g === null || g.tag !== 7
      ? ((g = Qn(y, h.mode, S, N)), (g.return = h), g)
      : ((g = i(g, y)), (g.return = h), g);
  }
  function m(h, g, y) {
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return (g = Ol("" + g, h.mode, y)), (g.return = h), g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case go:
          return (
            (y = qo(g.type, g.key, g.props, null, h.mode, y)),
            (y.ref = si(h, null, g)),
            (y.return = h),
            y
          );
        case sr:
          return (g = Pl(g, h.mode, y)), (g.return = h), g;
        case Jt:
          var S = g._init;
          return m(h, S(g._payload), y);
      }
      if (di(g) || ti(g))
        return (g = Qn(g, h.mode, y, null)), (g.return = h), g;
      To(h, g);
    }
    return null;
  }
  function p(h, g, y, S) {
    var N = g !== null ? g.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return N !== null ? null : l(h, g, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case go:
          return y.key === N ? a(h, g, y, S) : null;
        case sr:
          return y.key === N ? c(h, g, y, S) : null;
        case Jt:
          return (N = y._init), p(h, g, N(y._payload), S);
      }
      if (di(y) || ti(y)) return N !== null ? null : d(h, g, y, S, null);
      To(h, y);
    }
    return null;
  }
  function v(h, g, y, S, N) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return (h = h.get(y) || null), l(g, h, "" + S, N);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case go:
          return (h = h.get(S.key === null ? y : S.key) || null), a(g, h, S, N);
        case sr:
          return (h = h.get(S.key === null ? y : S.key) || null), c(g, h, S, N);
        case Jt:
          var j = S._init;
          return v(h, g, y, j(S._payload), N);
      }
      if (di(S) || ti(S)) return (h = h.get(y) || null), d(g, h, S, N, null);
      To(g, S);
    }
    return null;
  }
  function x(h, g, y, S) {
    for (
      var N = null, j = null, T = g, O = (g = 0), L = null;
      T !== null && O < y.length;
      O++
    ) {
      T.index > O ? ((L = T), (T = null)) : (L = T.sibling);
      var R = p(h, T, y[O], S);
      if (R === null) {
        T === null && (T = L);
        break;
      }
      e && T && R.alternate === null && t(h, T),
        (g = o(R, g, O)),
        j === null ? (N = R) : (j.sibling = R),
        (j = R),
        (T = L);
    }
    if (O === y.length) return n(h, T), J && Pn(h, O), N;
    if (T === null) {
      for (; O < y.length; O++)
        (T = m(h, y[O], S)),
          T !== null &&
            ((g = o(T, g, O)), j === null ? (N = T) : (j.sibling = T), (j = T));
      return J && Pn(h, O), N;
    }
    for (T = r(h, T); O < y.length; O++)
      (L = v(T, h, O, y[O], S)),
        L !== null &&
          (e && L.alternate !== null && T.delete(L.key === null ? O : L.key),
          (g = o(L, g, O)),
          j === null ? (N = L) : (j.sibling = L),
          (j = L));
    return (
      e &&
        T.forEach(function (Q) {
          return t(h, Q);
        }),
      J && Pn(h, O),
      N
    );
  }
  function w(h, g, y, S) {
    var N = ti(y);
    if (typeof N != "function") throw Error(P(150));
    if (((y = N.call(y)), y == null)) throw Error(P(151));
    for (
      var j = (N = null), T = g, O = (g = 0), L = null, R = y.next();
      T !== null && !R.done;
      O++, R = y.next()
    ) {
      T.index > O ? ((L = T), (T = null)) : (L = T.sibling);
      var Q = p(h, T, R.value, S);
      if (Q === null) {
        T === null && (T = L);
        break;
      }
      e && T && Q.alternate === null && t(h, T),
        (g = o(Q, g, O)),
        j === null ? (N = Q) : (j.sibling = Q),
        (j = Q),
        (T = L);
    }
    if (R.done) return n(h, T), J && Pn(h, O), N;
    if (T === null) {
      for (; !R.done; O++, R = y.next())
        (R = m(h, R.value, S)),
          R !== null &&
            ((g = o(R, g, O)), j === null ? (N = R) : (j.sibling = R), (j = R));
      return J && Pn(h, O), N;
    }
    for (T = r(h, T); !R.done; O++, R = y.next())
      (R = v(T, h, O, R.value, S)),
        R !== null &&
          (e && R.alternate !== null && T.delete(R.key === null ? O : R.key),
          (g = o(R, g, O)),
          j === null ? (N = R) : (j.sibling = R),
          (j = R));
    return (
      e &&
        T.forEach(function (ye) {
          return t(h, ye);
        }),
      J && Pn(h, O),
      N
    );
  }
  function E(h, g, y, S) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === lr &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case go:
          e: {
            for (var N = y.key, j = g; j !== null; ) {
              if (j.key === N) {
                if (((N = y.type), N === lr)) {
                  if (j.tag === 7) {
                    n(h, j.sibling),
                      (g = i(j, y.props.children)),
                      (g.return = h),
                      (h = g);
                    break e;
                  }
                } else if (
                  j.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === Jt &&
                    ed(N) === j.type)
                ) {
                  n(h, j.sibling),
                    (g = i(j, y.props)),
                    (g.ref = si(h, j, y)),
                    (g.return = h),
                    (h = g);
                  break e;
                }
                n(h, j);
                break;
              } else t(h, j);
              j = j.sibling;
            }
            y.type === lr
              ? ((g = Qn(y.props.children, h.mode, S, y.key)),
                (g.return = h),
                (h = g))
              : ((S = qo(y.type, y.key, y.props, null, h.mode, S)),
                (S.ref = si(h, g, y)),
                (S.return = h),
                (h = S));
          }
          return s(h);
        case sr:
          e: {
            for (j = y.key; g !== null; ) {
              if (g.key === j)
                if (
                  g.tag === 4 &&
                  g.stateNode.containerInfo === y.containerInfo &&
                  g.stateNode.implementation === y.implementation
                ) {
                  n(h, g.sibling),
                    (g = i(g, y.children || [])),
                    (g.return = h),
                    (h = g);
                  break e;
                } else {
                  n(h, g);
                  break;
                }
              else t(h, g);
              g = g.sibling;
            }
            (g = Pl(y, h.mode, S)), (g.return = h), (h = g);
          }
          return s(h);
        case Jt:
          return (j = y._init), E(h, g, j(y._payload), S);
      }
      if (di(y)) return x(h, g, y, S);
      if (ti(y)) return w(h, g, y, S);
      To(h, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        g !== null && g.tag === 6
          ? (n(h, g.sibling), (g = i(g, y)), (g.return = h), (h = g))
          : (n(h, g), (g = Ol(y, h.mode, S)), (g.return = h), (h = g)),
        s(h))
      : n(h, g);
  }
  return E;
}
var Ur = wh(!0),
  Ch = wh(!1),
  fs = Nn(null),
  hs = null,
  mr = null,
  vu = null;
function xu() {
  vu = mr = hs = null;
}
function wu(e) {
  var t = fs.current;
  Y(fs), (e._currentValue = t);
}
function ha(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Sr(e, t) {
  (hs = e),
    (vu = mr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (_e = !0), (e.firstContext = null));
}
function tt(e) {
  var t = e._currentValue;
  if (vu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), mr === null)) {
      if (hs === null) throw Error(P(308));
      (mr = e), (hs.dependencies = { lanes: 0, firstContext: e });
    } else mr = mr.next = e;
  return t;
}
var _n = null;
function Cu(e) {
  _n === null ? (_n = [e]) : _n.push(e);
}
function Sh(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Cu(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Ht(e, r)
  );
}
function Ht(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Xt = !1;
function Su(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Eh(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ft(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function gn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), V & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Ht(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Cu(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Ht(e, n)
  );
}
function Ho(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), lu(e, n);
  }
}
function td(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ps(e, t, n, r) {
  var i = e.updateQueue;
  Xt = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var a = l,
      c = a.next;
    (a.next = null), s === null ? (o = c) : (s.next = c), (s = a);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (l = d.lastBaseUpdate),
      l !== s &&
        (l === null ? (d.firstBaseUpdate = c) : (l.next = c),
        (d.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var m = i.baseState;
    (s = 0), (d = c = a = null), (l = o);
    do {
      var p = l.lane,
        v = l.eventTime;
      if ((r & p) === p) {
        d !== null &&
          (d = d.next =
            {
              eventTime: v,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var x = e,
            w = l;
          switch (((p = t), (v = n), w.tag)) {
            case 1:
              if (((x = w.payload), typeof x == "function")) {
                m = x.call(v, m, p);
                break e;
              }
              m = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = w.payload),
                (p = typeof x == "function" ? x.call(v, m, p) : x),
                p == null)
              )
                break e;
              m = ne({}, m, p);
              break e;
            case 2:
              Xt = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (p = i.effects),
          p === null ? (i.effects = [l]) : p.push(l));
      } else
        (v = {
          eventTime: v,
          lane: p,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          d === null ? ((c = d = v), (a = m)) : (d = d.next = v),
          (s |= p);
      if (((l = l.next), l === null)) {
        if (((l = i.shared.pending), l === null)) break;
        (p = l),
          (l = p.next),
          (p.next = null),
          (i.lastBaseUpdate = p),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (d === null && (a = m),
      (i.baseState = a),
      (i.firstBaseUpdate = c),
      (i.lastBaseUpdate = d),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (qn |= s), (e.lanes = s), (e.memoizedState = m);
  }
}
function nd(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(P(191, i));
        i.call(r);
      }
    }
}
var io = {},
  Ot = Nn(io),
  Fi = Nn(io),
  zi = Nn(io);
function bn(e) {
  if (e === io) throw Error(P(174));
  return e;
}
function Eu(e, t) {
  switch ((q(zi, t), q(Fi, e), q(Ot, io), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Kl(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Kl(t, e));
  }
  Y(Ot), q(Ot, t);
}
function Br() {
  Y(Ot), Y(Fi), Y(zi);
}
function Nh(e) {
  bn(zi.current);
  var t = bn(Ot.current),
    n = Kl(t, e.type);
  t !== n && (q(Fi, e), q(Ot, n));
}
function Nu(e) {
  Fi.current === e && (Y(Ot), Y(Fi));
}
var ee = Nn(0);
function ms(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Sl = [];
function ku() {
  for (var e = 0; e < Sl.length; e++)
    Sl[e]._workInProgressVersionPrimary = null;
  Sl.length = 0;
}
var Vo = Wt.ReactCurrentDispatcher,
  El = Wt.ReactCurrentBatchConfig,
  Gn = 0,
  te = null,
  he = null,
  me = null,
  gs = !1,
  Si = !1,
  $i = 0,
  yy = 0;
function Se() {
  throw Error(P(321));
}
function ju(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!mt(e[n], t[n])) return !1;
  return !0;
}
function Tu(e, t, n, r, i, o) {
  if (
    ((Gn = o),
    (te = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Vo.current = e === null || e.memoizedState === null ? Cy : Sy),
    (e = n(r, i)),
    Si)
  ) {
    o = 0;
    do {
      if (((Si = !1), ($i = 0), 25 <= o)) throw Error(P(301));
      (o += 1),
        (me = he = null),
        (t.updateQueue = null),
        (Vo.current = Ey),
        (e = n(r, i));
    } while (Si);
  }
  if (
    ((Vo.current = ys),
    (t = he !== null && he.next !== null),
    (Gn = 0),
    (me = he = te = null),
    (gs = !1),
    t)
  )
    throw Error(P(300));
  return e;
}
function Ou() {
  var e = $i !== 0;
  return ($i = 0), e;
}
function wt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return me === null ? (te.memoizedState = me = e) : (me = me.next = e), me;
}
function nt() {
  if (he === null) {
    var e = te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = he.next;
  var t = me === null ? te.memoizedState : me.next;
  if (t !== null) (me = t), (he = e);
  else {
    if (e === null) throw Error(P(310));
    (he = e),
      (e = {
        memoizedState: he.memoizedState,
        baseState: he.baseState,
        baseQueue: he.baseQueue,
        queue: he.queue,
        next: null,
      }),
      me === null ? (te.memoizedState = me = e) : (me = me.next = e);
  }
  return me;
}
function Ui(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Nl(e) {
  var t = nt(),
    n = t.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = e;
  var r = he,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = o.next), (o.next = s);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var l = (s = null),
      a = null,
      c = o;
    do {
      var d = c.lane;
      if ((Gn & d) === d)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action));
      else {
        var m = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        a === null ? ((l = a = m), (s = r)) : (a = a.next = m),
          (te.lanes |= d),
          (qn |= d);
      }
      c = c.next;
    } while (c !== null && c !== o);
    a === null ? (s = r) : (a.next = l),
      mt(r, t.memoizedState) || (_e = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (te.lanes |= o), (qn |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function kl(e) {
  var t = nt(),
    n = t.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (o = e(o, s.action)), (s = s.next);
    while (s !== i);
    mt(o, t.memoizedState) || (_e = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function kh() {}
function jh(e, t) {
  var n = te,
    r = nt(),
    i = t(),
    o = !mt(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (_e = !0)),
    (r = r.queue),
    Pu(Ph.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (me !== null && me.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Bi(9, Oh.bind(null, n, r, i, t), void 0, null),
      ge === null)
    )
      throw Error(P(349));
    Gn & 30 || Th(n, t, i);
  }
  return i;
}
function Th(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = te.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (te.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Oh(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Lh(t) && Rh(e);
}
function Ph(e, t, n) {
  return n(function () {
    Lh(t) && Rh(e);
  });
}
function Lh(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !mt(e, n);
  } catch {
    return !0;
  }
}
function Rh(e) {
  var t = Ht(e, 1);
  t !== null && pt(t, e, 1, -1);
}
function rd(e) {
  var t = wt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ui,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = wy.bind(null, te, e)),
    [t.memoizedState, e]
  );
}
function Bi(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = te.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (te.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Ih() {
  return nt().memoizedState;
}
function Qo(e, t, n, r) {
  var i = wt();
  (te.flags |= e),
    (i.memoizedState = Bi(1 | t, n, void 0, r === void 0 ? null : r));
}
function zs(e, t, n, r) {
  var i = nt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (he !== null) {
    var s = he.memoizedState;
    if (((o = s.destroy), r !== null && ju(r, s.deps))) {
      i.memoizedState = Bi(t, n, o, r);
      return;
    }
  }
  (te.flags |= e), (i.memoizedState = Bi(1 | t, n, o, r));
}
function id(e, t) {
  return Qo(8390656, 8, e, t);
}
function Pu(e, t) {
  return zs(2048, 8, e, t);
}
function Dh(e, t) {
  return zs(4, 2, e, t);
}
function Ah(e, t) {
  return zs(4, 4, e, t);
}
function _h(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function bh(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), zs(4, 4, _h.bind(null, t, e), n)
  );
}
function Lu() {}
function Mh(e, t) {
  var n = nt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ju(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Fh(e, t) {
  var n = nt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ju(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function zh(e, t, n) {
  return Gn & 21
    ? (mt(n, t) || ((n = Vf()), (te.lanes |= n), (qn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (_e = !0)), (e.memoizedState = n));
}
function vy(e, t) {
  var n = K;
  (K = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = El.transition;
  El.transition = {};
  try {
    e(!1), t();
  } finally {
    (K = n), (El.transition = r);
  }
}
function $h() {
  return nt().memoizedState;
}
function xy(e, t, n) {
  var r = vn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Uh(e))
  )
    Bh(t, n);
  else if (((n = Sh(e, t, n, r)), n !== null)) {
    var i = Le();
    pt(n, e, r, i), Hh(n, t, r);
  }
}
function wy(e, t, n) {
  var r = vn(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Uh(e)) Bh(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = l), mt(l, s))) {
          var a = t.interleaved;
          a === null
            ? ((i.next = i), Cu(t))
            : ((i.next = a.next), (a.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = Sh(e, t, i, r)),
      n !== null && ((i = Le()), pt(n, e, r, i), Hh(n, t, r));
  }
}
function Uh(e) {
  var t = e.alternate;
  return e === te || (t !== null && t === te);
}
function Bh(e, t) {
  Si = gs = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Hh(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), lu(e, n);
  }
}
var ys = {
    readContext: tt,
    useCallback: Se,
    useContext: Se,
    useEffect: Se,
    useImperativeHandle: Se,
    useInsertionEffect: Se,
    useLayoutEffect: Se,
    useMemo: Se,
    useReducer: Se,
    useRef: Se,
    useState: Se,
    useDebugValue: Se,
    useDeferredValue: Se,
    useTransition: Se,
    useMutableSource: Se,
    useSyncExternalStore: Se,
    useId: Se,
    unstable_isNewReconciler: !1,
  },
  Cy = {
    readContext: tt,
    useCallback: function (e, t) {
      return (wt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: tt,
    useEffect: id,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Qo(4194308, 4, _h.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Qo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Qo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = wt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = wt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = xy.bind(null, te, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = wt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: rd,
    useDebugValue: Lu,
    useDeferredValue: function (e) {
      return (wt().memoizedState = e);
    },
    useTransition: function () {
      var e = rd(!1),
        t = e[0];
      return (e = vy.bind(null, e[1])), (wt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = te,
        i = wt();
      if (J) {
        if (n === void 0) throw Error(P(407));
        n = n();
      } else {
        if (((n = t()), ge === null)) throw Error(P(349));
        Gn & 30 || Th(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        id(Ph.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Bi(9, Oh.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = wt(),
        t = ge.identifierPrefix;
      if (J) {
        var n = Mt,
          r = bt;
        (n = (r & ~(1 << (32 - ht(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = $i++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = yy++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Sy = {
    readContext: tt,
    useCallback: Mh,
    useContext: tt,
    useEffect: Pu,
    useImperativeHandle: bh,
    useInsertionEffect: Dh,
    useLayoutEffect: Ah,
    useMemo: Fh,
    useReducer: Nl,
    useRef: Ih,
    useState: function () {
      return Nl(Ui);
    },
    useDebugValue: Lu,
    useDeferredValue: function (e) {
      var t = nt();
      return zh(t, he.memoizedState, e);
    },
    useTransition: function () {
      var e = Nl(Ui)[0],
        t = nt().memoizedState;
      return [e, t];
    },
    useMutableSource: kh,
    useSyncExternalStore: jh,
    useId: $h,
    unstable_isNewReconciler: !1,
  },
  Ey = {
    readContext: tt,
    useCallback: Mh,
    useContext: tt,
    useEffect: Pu,
    useImperativeHandle: bh,
    useInsertionEffect: Dh,
    useLayoutEffect: Ah,
    useMemo: Fh,
    useReducer: kl,
    useRef: Ih,
    useState: function () {
      return kl(Ui);
    },
    useDebugValue: Lu,
    useDeferredValue: function (e) {
      var t = nt();
      return he === null ? (t.memoizedState = e) : zh(t, he.memoizedState, e);
    },
    useTransition: function () {
      var e = kl(Ui)[0],
        t = nt().memoizedState;
      return [e, t];
    },
    useMutableSource: kh,
    useSyncExternalStore: jh,
    useId: $h,
    unstable_isNewReconciler: !1,
  };
function at(e, t) {
  if (e && e.defaultProps) {
    (t = ne({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function pa(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ne({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $s = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Xn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Le(),
      i = vn(e),
      o = Ft(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = gn(e, o, i)),
      t !== null && (pt(t, e, i, r), Ho(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Le(),
      i = vn(e),
      o = Ft(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = gn(e, o, i)),
      t !== null && (pt(t, e, i, r), Ho(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Le(),
      r = vn(e),
      i = Ft(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = gn(e, i, r)),
      t !== null && (pt(t, e, r, n), Ho(t, e, r));
  },
};
function od(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Ai(n, r) || !Ai(i, o)
        : !0
  );
}
function Vh(e, t, n) {
  var r = !1,
    i = Cn,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = tt(o))
      : ((i = Me(t) ? Wn : je.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? zr(e, i) : Cn)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = $s),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function sd(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && $s.enqueueReplaceState(t, t.state, null);
}
function ma(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Su(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = tt(o))
    : ((o = Me(t) ? Wn : je.current), (i.context = zr(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (pa(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && $s.enqueueReplaceState(i, i.state, null),
      ps(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Hr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Ym(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function jl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ga(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Ny = typeof WeakMap == "function" ? WeakMap : Map;
function Qh(e, t, n) {
  (n = Ft(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      xs || ((xs = !0), (ja = r)), ga(e, t);
    }),
    n
  );
}
function Wh(e, t, n) {
  (n = Ft(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        ga(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        ga(e, t),
          typeof r != "function" &&
            (yn === null ? (yn = new Set([this])) : yn.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function ld(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ny();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Fy.bind(null, e, t, n)), t.then(e, e));
}
function ad(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ud(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Ft(-1, 1)), (t.tag = 2), gn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var ky = Wt.ReactCurrentOwner,
  _e = !1;
function Pe(e, t, n, r) {
  t.child = e === null ? Ch(t, null, n, r) : Ur(t, e.child, n, r);
}
function cd(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    Sr(t, i),
    (r = Tu(e, t, n, r, o, i)),
    (n = Ou()),
    e !== null && !_e
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Vt(e, t, i))
      : (J && n && mu(t), (t.flags |= 1), Pe(e, t, r, i), t.child)
  );
}
function dd(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Fu(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Kh(e, t, o, r, i))
      : ((e = qo(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Ai), n(s, r) && e.ref === t.ref)
    )
      return Vt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = xn(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Kh(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ai(o, r) && e.ref === t.ref)
      if (((_e = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (_e = !0);
      else return (t.lanes = e.lanes), Vt(e, t, i);
  }
  return ya(e, t, n, r, i);
}
function Gh(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        q(yr, Ue),
        (Ue |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          q(yr, Ue),
          (Ue |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        q(yr, Ue),
        (Ue |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      q(yr, Ue),
      (Ue |= r);
  return Pe(e, t, i, n), t.child;
}
function qh(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function ya(e, t, n, r, i) {
  var o = Me(n) ? Wn : je.current;
  return (
    (o = zr(t, o)),
    Sr(t, i),
    (n = Tu(e, t, n, r, o, i)),
    (r = Ou()),
    e !== null && !_e
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Vt(e, t, i))
      : (J && r && mu(t), (t.flags |= 1), Pe(e, t, n, i), t.child)
  );
}
function fd(e, t, n, r, i) {
  if (Me(n)) {
    var o = !0;
    us(t);
  } else o = !1;
  if ((Sr(t, i), t.stateNode === null))
    Wo(e, t), Vh(t, n, r), ma(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = tt(c))
      : ((c = Me(n) ? Wn : je.current), (c = zr(t, c)));
    var d = n.getDerivedStateFromProps,
      m =
        typeof d == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    m ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== r || a !== c) && sd(t, s, r, c)),
      (Xt = !1);
    var p = t.memoizedState;
    (s.state = p),
      ps(t, r, s, i),
      (a = t.memoizedState),
      l !== r || p !== a || be.current || Xt
        ? (typeof d == "function" && (pa(t, n, d, r), (a = t.memoizedState)),
          (l = Xt || od(t, n, l, r, p, a, c))
            ? (m ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = c),
          (r = l))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Eh(e, t),
      (l = t.memoizedProps),
      (c = t.type === t.elementType ? l : at(t.type, l)),
      (s.props = c),
      (m = t.pendingProps),
      (p = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = tt(a))
        : ((a = Me(n) ? Wn : je.current), (a = zr(t, a)));
    var v = n.getDerivedStateFromProps;
    (d =
      typeof v == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== m || p !== a) && sd(t, s, r, a)),
      (Xt = !1),
      (p = t.memoizedState),
      (s.state = p),
      ps(t, r, s, i);
    var x = t.memoizedState;
    l !== m || p !== x || be.current || Xt
      ? (typeof v == "function" && (pa(t, n, v, r), (x = t.memoizedState)),
        (c = Xt || od(t, n, c, r, p, x, a) || !1)
          ? (d ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, x, a),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, x, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = x)),
        (s.props = r),
        (s.state = x),
        (s.context = a),
        (r = c))
      : (typeof s.componentDidUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return va(e, t, n, r, o, i);
}
function va(e, t, n, r, i, o) {
  qh(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && Yc(t, n, !1), Vt(e, t, o);
  (r = t.stateNode), (ky.current = t);
  var l =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = Ur(t, e.child, null, o)), (t.child = Ur(t, null, l, o)))
      : Pe(e, t, l, o),
    (t.memoizedState = r.state),
    i && Yc(t, n, !0),
    t.child
  );
}
function Zh(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Zc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Zc(e, t.context, !1),
    Eu(e, t.containerInfo);
}
function hd(e, t, n, r, i) {
  return $r(), yu(i), (t.flags |= 256), Pe(e, t, n, r), t.child;
}
var xa = { dehydrated: null, treeContext: null, retryLane: 0 };
function wa(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Yh(e, t, n) {
  var r = t.pendingProps,
    i = ee.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    l
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    q(ee, i & 1),
    e === null)
  )
    return (
      fa(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = Hs(s, r, 0, null)),
              (e = Qn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = wa(n)),
              (t.memoizedState = xa),
              e)
            : Ru(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((l = i.dehydrated), l !== null)))
    return jy(e, t, s, r, l, i, n);
  if (o) {
    (o = r.fallback), (s = t.mode), (i = e.child), (l = i.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = xn(i, a)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      l !== null ? (o = xn(l, o)) : ((o = Qn(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? wa(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = xa),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = xn(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Ru(e, t) {
  return (
    (t = Hs({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Oo(e, t, n, r) {
  return (
    r !== null && yu(r),
    Ur(t, e.child, null, n),
    (e = Ru(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function jy(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = jl(Error(P(422)))), Oo(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (i = t.mode),
          (r = Hs({ mode: "visible", children: r.children }, i, 0, null)),
          (o = Qn(o, i, s, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && Ur(t, e.child, null, s),
          (t.child.memoizedState = wa(s)),
          (t.memoizedState = xa),
          o);
  if (!(t.mode & 1)) return Oo(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (o = Error(P(419))), (r = jl(o, r, void 0)), Oo(e, t, s, r);
  }
  if (((l = (s & e.childLanes) !== 0), _e || l)) {
    if (((r = ge), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), Ht(e, i), pt(r, e, i, -1));
    }
    return Mu(), (r = jl(Error(P(421)))), Oo(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = zy.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Be = mn(i.nextSibling)),
      (He = t),
      (J = !0),
      (dt = null),
      e !== null &&
        ((Ze[Ye++] = bt),
        (Ze[Ye++] = Mt),
        (Ze[Ye++] = Kn),
        (bt = e.id),
        (Mt = e.overflow),
        (Kn = t)),
      (t = Ru(t, r.children)),
      (t.flags |= 4096),
      t);
}
function pd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ha(e.return, t, n);
}
function Tl(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function Jh(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((Pe(e, t, r.children, n), (r = ee.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && pd(e, n, t);
        else if (e.tag === 19) pd(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((q(ee, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ms(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Tl(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ms(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Tl(t, !0, n, null, o);
        break;
      case "together":
        Tl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Wo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Vt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (qn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(P(153));
  if (t.child !== null) {
    for (
      e = t.child, n = xn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = xn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Ty(e, t, n) {
  switch (t.tag) {
    case 3:
      Zh(t), $r();
      break;
    case 5:
      Nh(t);
      break;
    case 1:
      Me(t.type) && us(t);
      break;
    case 4:
      Eu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      q(fs, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (q(ee, ee.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Yh(e, t, n)
            : (q(ee, ee.current & 1),
              (e = Vt(e, t, n)),
              e !== null ? e.sibling : null);
      q(ee, ee.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Jh(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        q(ee, ee.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Gh(e, t, n);
  }
  return Vt(e, t, n);
}
var Xh, Ca, ep, tp;
Xh = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Ca = function () {};
ep = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), bn(Ot.current);
    var o = null;
    switch (n) {
      case "input":
        (i = Hl(e, i)), (r = Hl(e, r)), (o = []);
        break;
      case "select":
        (i = ne({}, i, { value: void 0 })),
          (r = ne({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = Wl(e, i)), (r = Wl(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ls);
    }
    Gl(n, r);
    var s;
    n = null;
    for (c in i)
      if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
        if (c === "style") {
          var l = i[c];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (Ti.hasOwnProperty(c)
              ? o || (o = [])
              : (o = o || []).push(c, null));
    for (c in r) {
      var a = r[c];
      if (
        ((l = i != null ? i[c] : void 0),
        r.hasOwnProperty(c) && a !== l && (a != null || l != null))
      )
        if (c === "style")
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else n || (o || (o = []), o.push(c, n)), (n = a);
        else
          c === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (o = o || []).push(c, a))
            : c === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (o = o || []).push(c, "" + a)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (Ti.hasOwnProperty(c)
                  ? (a != null && c === "onScroll" && Z("scroll", e),
                    o || l === a || (o = []))
                  : (o = o || []).push(c, a));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
tp = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function li(e, t) {
  if (!J)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Ee(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Oy(e, t, n) {
  var r = t.pendingProps;
  switch ((gu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Ee(t), null;
    case 1:
      return Me(t.type) && as(), Ee(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Br(),
        Y(be),
        Y(je),
        ku(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (jo(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), dt !== null && (Pa(dt), (dt = null)))),
        Ca(e, t),
        Ee(t),
        null
      );
    case 5:
      Nu(t);
      var i = bn(zi.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        ep(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(P(166));
          return Ee(t), null;
        }
        if (((e = bn(Ot.current)), jo(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[jt] = t), (r[Mi] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              Z("cancel", r), Z("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Z("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < hi.length; i++) Z(hi[i], r);
              break;
            case "source":
              Z("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Z("error", r), Z("load", r);
              break;
            case "details":
              Z("toggle", r);
              break;
            case "input":
              Ec(r, o), Z("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                Z("invalid", r);
              break;
            case "textarea":
              kc(r, o), Z("invalid", r);
          }
          Gl(n, o), (i = null);
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var l = o[s];
              s === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (o.suppressHydrationWarning !== !0 &&
                      ko(r.textContent, l, e),
                    (i = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (o.suppressHydrationWarning !== !0 &&
                      ko(r.textContent, l, e),
                    (i = ["children", "" + l]))
                : Ti.hasOwnProperty(s) &&
                  l != null &&
                  s === "onScroll" &&
                  Z("scroll", r);
            }
          switch (n) {
            case "input":
              yo(r), Nc(r, o, !0);
              break;
            case "textarea":
              yo(r), jc(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ls);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Pf(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === "select" &&
                      ((s = e),
                      r.multiple
                        ? (s.multiple = !0)
                        : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[jt] = t),
            (e[Mi] = r),
            Xh(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = ql(n, r)), n)) {
              case "dialog":
                Z("cancel", e), Z("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Z("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < hi.length; i++) Z(hi[i], e);
                i = r;
                break;
              case "source":
                Z("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                Z("error", e), Z("load", e), (i = r);
                break;
              case "details":
                Z("toggle", e), (i = r);
                break;
              case "input":
                Ec(e, r), (i = Hl(e, r)), Z("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ne({}, r, { value: void 0 })),
                  Z("invalid", e);
                break;
              case "textarea":
                kc(e, r), (i = Wl(e, r)), Z("invalid", e);
                break;
              default:
                i = r;
            }
            Gl(n, i), (l = i);
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var a = l[o];
                o === "style"
                  ? If(e, a)
                  : o === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && Lf(e, a))
                    : o === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && Oi(e, a)
                        : typeof a == "number" && Oi(e, "" + a)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (Ti.hasOwnProperty(o)
                          ? a != null && o === "onScroll" && Z("scroll", e)
                          : a != null && tu(e, o, a, s));
              }
            switch (n) {
              case "input":
                yo(e), Nc(e, r, !1);
                break;
              case "textarea":
                yo(e), jc(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + wn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? vr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      vr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = ls);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Ee(t), null;
    case 6:
      if (e && t.stateNode != null) tp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(P(166));
        if (((n = bn(zi.current)), bn(Ot.current), jo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[jt] = t),
            (o = r.nodeValue !== n) && ((e = He), e !== null))
          )
            switch (e.tag) {
              case 3:
                ko(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ko(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[jt] = t),
            (t.stateNode = r);
      }
      return Ee(t), null;
    case 13:
      if (
        (Y(ee),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (J && Be !== null && t.mode & 1 && !(t.flags & 128))
          xh(), $r(), (t.flags |= 98560), (o = !1);
        else if (((o = jo(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(P(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(P(317));
            o[jt] = t;
          } else
            $r(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Ee(t), (o = !1);
        } else dt !== null && (Pa(dt), (dt = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ee.current & 1 ? pe === 0 && (pe = 3) : Mu())),
          t.updateQueue !== null && (t.flags |= 4),
          Ee(t),
          null);
    case 4:
      return (
        Br(), Ca(e, t), e === null && _i(t.stateNode.containerInfo), Ee(t), null
      );
    case 10:
      return wu(t.type._context), Ee(t), null;
    case 17:
      return Me(t.type) && as(), Ee(t), null;
    case 19:
      if ((Y(ee), (o = t.memoizedState), o === null)) return Ee(t), null;
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) li(o, !1);
        else {
          if (pe !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = ms(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    li(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return q(ee, (ee.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            ue() > Vr &&
            ((t.flags |= 128), (r = !0), li(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ms(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              li(o, !0),
              o.tail === null && o.tailMode === "hidden" && !s.alternate && !J)
            )
              return Ee(t), null;
          } else
            2 * ue() - o.renderingStartTime > Vr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), li(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = ue()),
          (t.sibling = null),
          (n = ee.current),
          q(ee, r ? (n & 1) | 2 : n & 1),
          t)
        : (Ee(t), null);
    case 22:
    case 23:
      return (
        bu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ue & 1073741824 && (Ee(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Ee(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(P(156, t.tag));
}
function Py(e, t) {
  switch ((gu(t), t.tag)) {
    case 1:
      return (
        Me(t.type) && as(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Br(),
        Y(be),
        Y(je),
        ku(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Nu(t), null;
    case 13:
      if ((Y(ee), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(P(340));
        $r();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Y(ee), null;
    case 4:
      return Br(), null;
    case 10:
      return wu(t.type._context), null;
    case 22:
    case 23:
      return bu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Po = !1,
  ke = !1,
  Ly = typeof WeakSet == "function" ? WeakSet : Set,
  D = null;
function gr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        oe(e, t, r);
      }
    else n.current = null;
}
function Sa(e, t, n) {
  try {
    n();
  } catch (r) {
    oe(e, t, r);
  }
}
var md = !1;
function Ry(e, t) {
  if (((oa = is), (e = sh()), pu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            c = 0,
            d = 0,
            m = e,
            p = null;
          t: for (;;) {
            for (
              var v;
              m !== n || (i !== 0 && m.nodeType !== 3) || (l = s + i),
                m !== o || (r !== 0 && m.nodeType !== 3) || (a = s + r),
                m.nodeType === 3 && (s += m.nodeValue.length),
                (v = m.firstChild) !== null;

            )
              (p = m), (m = v);
            for (;;) {
              if (m === e) break t;
              if (
                (p === n && ++c === i && (l = s),
                p === o && ++d === r && (a = s),
                (v = m.nextSibling) !== null)
              )
                break;
              (m = p), (p = m.parentNode);
            }
            m = v;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (sa = { focusedElem: e, selectionRange: n }, is = !1, D = t; D !== null; )
    if (((t = D), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (D = e);
    else
      for (; D !== null; ) {
        t = D;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var w = x.memoizedProps,
                    E = x.memoizedState,
                    h = t.stateNode,
                    g = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : at(t.type, w),
                      E,
                    );
                  h.__reactInternalSnapshotBeforeUpdate = g;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(P(163));
            }
        } catch (S) {
          oe(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (D = e);
          break;
        }
        D = t.return;
      }
  return (x = md), (md = !1), x;
}
function Ei(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && Sa(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Us(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Ea(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function np(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), np(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[jt], delete t[Mi], delete t[ua], delete t[hy], delete t[py])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function rp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function gd(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || rp(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Na(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ls));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Na(e, t, n), e = e.sibling; e !== null; ) Na(e, t, n), (e = e.sibling);
}
function ka(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ka(e, t, n), e = e.sibling; e !== null; ) ka(e, t, n), (e = e.sibling);
}
var ve = null,
  ct = !1;
function Zt(e, t, n) {
  for (n = n.child; n !== null; ) ip(e, t, n), (n = n.sibling);
}
function ip(e, t, n) {
  if (Tt && typeof Tt.onCommitFiberUnmount == "function")
    try {
      Tt.onCommitFiberUnmount(Ds, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ke || gr(n, t);
    case 6:
      var r = ve,
        i = ct;
      (ve = null),
        Zt(e, t, n),
        (ve = r),
        (ct = i),
        ve !== null &&
          (ct
            ? ((e = ve),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ve.removeChild(n.stateNode));
      break;
    case 18:
      ve !== null &&
        (ct
          ? ((e = ve),
            (n = n.stateNode),
            e.nodeType === 8
              ? wl(e.parentNode, n)
              : e.nodeType === 1 && wl(e, n),
            Ii(e))
          : wl(ve, n.stateNode));
      break;
    case 4:
      (r = ve),
        (i = ct),
        (ve = n.stateNode.containerInfo),
        (ct = !0),
        Zt(e, t, n),
        (ve = r),
        (ct = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ke &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          (o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && Sa(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      Zt(e, t, n);
      break;
    case 1:
      if (
        !ke &&
        (gr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          oe(n, t, l);
        }
      Zt(e, t, n);
      break;
    case 21:
      Zt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ke = (r = ke) || n.memoizedState !== null), Zt(e, t, n), (ke = r))
        : Zt(e, t, n);
      break;
    default:
      Zt(e, t, n);
  }
}
function yd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ly()),
      t.forEach(function (r) {
        var i = $y.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function lt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (ve = l.stateNode), (ct = !1);
              break e;
            case 3:
              (ve = l.stateNode.containerInfo), (ct = !0);
              break e;
            case 4:
              (ve = l.stateNode.containerInfo), (ct = !0);
              break e;
          }
          l = l.return;
        }
        if (ve === null) throw Error(P(160));
        ip(o, s, i), (ve = null), (ct = !1);
        var a = i.alternate;
        a !== null && (a.return = null), (i.return = null);
      } catch (c) {
        oe(i, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) op(t, e), (t = t.sibling);
}
function op(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((lt(t, e), xt(e), r & 4)) {
        try {
          Ei(3, e, e.return), Us(3, e);
        } catch (w) {
          oe(e, e.return, w);
        }
        try {
          Ei(5, e, e.return);
        } catch (w) {
          oe(e, e.return, w);
        }
      }
      break;
    case 1:
      lt(t, e), xt(e), r & 512 && n !== null && gr(n, n.return);
      break;
    case 5:
      if (
        (lt(t, e),
        xt(e),
        r & 512 && n !== null && gr(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Oi(i, "");
        } catch (w) {
          oe(e, e.return, w);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && o.type === "radio" && o.name != null && Tf(i, o),
              ql(l, s);
            var c = ql(l, o);
            for (s = 0; s < a.length; s += 2) {
              var d = a[s],
                m = a[s + 1];
              d === "style"
                ? If(i, m)
                : d === "dangerouslySetInnerHTML"
                  ? Lf(i, m)
                  : d === "children"
                    ? Oi(i, m)
                    : tu(i, d, m, c);
            }
            switch (l) {
              case "input":
                Vl(i, o);
                break;
              case "textarea":
                Of(i, o);
                break;
              case "select":
                var p = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var v = o.value;
                v != null
                  ? vr(i, !!o.multiple, v, !1)
                  : p !== !!o.multiple &&
                    (o.defaultValue != null
                      ? vr(i, !!o.multiple, o.defaultValue, !0)
                      : vr(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Mi] = o;
          } catch (w) {
            oe(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((lt(t, e), xt(e), r & 4)) {
        if (e.stateNode === null) throw Error(P(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (w) {
          oe(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (lt(t, e), xt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Ii(t.containerInfo);
        } catch (w) {
          oe(e, e.return, w);
        }
      break;
    case 4:
      lt(t, e), xt(e);
      break;
    case 13:
      lt(t, e),
        xt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Au = ue())),
        r & 4 && yd(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ke = (c = ke) || d), lt(t, e), (ke = c)) : lt(t, e),
        xt(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !d && e.mode & 1)
        )
          for (D = e, d = e.child; d !== null; ) {
            for (m = D = d; D !== null; ) {
              switch (((p = D), (v = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ei(4, p, p.return);
                  break;
                case 1:
                  gr(p, p.return);
                  var x = p.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    (r = p), (n = p.return);
                    try {
                      (t = r),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount();
                    } catch (w) {
                      oe(r, n, w);
                    }
                  }
                  break;
                case 5:
                  gr(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    xd(m);
                    continue;
                  }
              }
              v !== null ? ((v.return = p), (D = v)) : xd(m);
            }
            d = d.sibling;
          }
        e: for (d = null, m = e; ; ) {
          if (m.tag === 5) {
            if (d === null) {
              d = m;
              try {
                (i = m.stateNode),
                  c
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((l = m.stateNode),
                      (a = m.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = Rf("display", s)));
              } catch (w) {
                oe(e, e.return, w);
              }
            }
          } else if (m.tag === 6) {
            if (d === null)
              try {
                m.stateNode.nodeValue = c ? "" : m.memoizedProps;
              } catch (w) {
                oe(e, e.return, w);
              }
          } else if (
            ((m.tag !== 22 && m.tag !== 23) ||
              m.memoizedState === null ||
              m === e) &&
            m.child !== null
          ) {
            (m.child.return = m), (m = m.child);
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            d === m && (d = null), (m = m.return);
          }
          d === m && (d = null), (m.sibling.return = m.return), (m = m.sibling);
        }
      }
      break;
    case 19:
      lt(t, e), xt(e), r & 4 && yd(e);
      break;
    case 21:
      break;
    default:
      lt(t, e), xt(e);
  }
}
function xt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (rp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(P(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Oi(i, ""), (r.flags &= -33));
          var o = gd(e);
          ka(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = gd(e);
          Na(e, l, s);
          break;
        default:
          throw Error(P(161));
      }
    } catch (a) {
      oe(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Iy(e, t, n) {
  (D = e), sp(e);
}
function sp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; D !== null; ) {
    var i = D,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || Po;
      if (!s) {
        var l = i.alternate,
          a = (l !== null && l.memoizedState !== null) || ke;
        l = Po;
        var c = ke;
        if (((Po = s), (ke = a) && !c))
          for (D = i; D !== null; )
            (s = D),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? wd(i)
                : a !== null
                  ? ((a.return = s), (D = a))
                  : wd(i);
        for (; o !== null; ) (D = o), sp(o), (o = o.sibling);
        (D = i), (Po = l), (ke = c);
      }
      vd(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (D = o)) : vd(e);
  }
}
function vd(e) {
  for (; D !== null; ) {
    var t = D;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ke || Us(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ke)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : at(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var o = t.updateQueue;
              o !== null && nd(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                nd(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var d = c.memoizedState;
                  if (d !== null) {
                    var m = d.dehydrated;
                    m !== null && Ii(m);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(P(163));
          }
        ke || (t.flags & 512 && Ea(t));
      } catch (p) {
        oe(t, t.return, p);
      }
    }
    if (t === e) {
      D = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (D = n);
      break;
    }
    D = t.return;
  }
}
function xd(e) {
  for (; D !== null; ) {
    var t = D;
    if (t === e) {
      D = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (D = n);
      break;
    }
    D = t.return;
  }
}
function wd(e) {
  for (; D !== null; ) {
    var t = D;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Us(4, t);
          } catch (a) {
            oe(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              oe(t, i, a);
            }
          }
          var o = t.return;
          try {
            Ea(t);
          } catch (a) {
            oe(t, o, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Ea(t);
          } catch (a) {
            oe(t, s, a);
          }
      }
    } catch (a) {
      oe(t, t.return, a);
    }
    if (t === e) {
      D = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (D = l);
      break;
    }
    D = t.return;
  }
}
var Dy = Math.ceil,
  vs = Wt.ReactCurrentDispatcher,
  Iu = Wt.ReactCurrentOwner,
  et = Wt.ReactCurrentBatchConfig,
  V = 0,
  ge = null,
  de = null,
  we = 0,
  Ue = 0,
  yr = Nn(0),
  pe = 0,
  Hi = null,
  qn = 0,
  Bs = 0,
  Du = 0,
  Ni = null,
  Ae = null,
  Au = 0,
  Vr = 1 / 0,
  Dt = null,
  xs = !1,
  ja = null,
  yn = null,
  Lo = !1,
  dn = null,
  ws = 0,
  ki = 0,
  Ta = null,
  Ko = -1,
  Go = 0;
function Le() {
  return V & 6 ? ue() : Ko !== -1 ? Ko : (Ko = ue());
}
function vn(e) {
  return e.mode & 1
    ? V & 2 && we !== 0
      ? we & -we
      : gy.transition !== null
        ? (Go === 0 && (Go = Vf()), Go)
        : ((e = K),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Yf(e.type))),
          e)
    : 1;
}
function pt(e, t, n, r) {
  if (50 < ki) throw ((ki = 0), (Ta = null), Error(P(185)));
  to(e, n, r),
    (!(V & 2) || e !== ge) &&
      (e === ge && (!(V & 2) && (Bs |= n), pe === 4 && tn(e, we)),
      Fe(e, r),
      n === 1 && V === 0 && !(t.mode & 1) && ((Vr = ue() + 500), Fs && kn()));
}
function Fe(e, t) {
  var n = e.callbackNode;
  gg(e, t);
  var r = rs(e, e === ge ? we : 0);
  if (r === 0)
    n !== null && Pc(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Pc(n), t === 1))
      e.tag === 0 ? my(Cd.bind(null, e)) : gh(Cd.bind(null, e)),
        dy(function () {
          !(V & 6) && kn();
        }),
        (n = null);
    else {
      switch (Qf(r)) {
        case 1:
          n = su;
          break;
        case 4:
          n = Bf;
          break;
        case 16:
          n = ns;
          break;
        case 536870912:
          n = Hf;
          break;
        default:
          n = ns;
      }
      n = pp(n, lp.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function lp(e, t) {
  if (((Ko = -1), (Go = 0), V & 6)) throw Error(P(327));
  var n = e.callbackNode;
  if (Er() && e.callbackNode !== n) return null;
  var r = rs(e, e === ge ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Cs(e, r);
  else {
    t = r;
    var i = V;
    V |= 2;
    var o = up();
    (ge !== e || we !== t) && ((Dt = null), (Vr = ue() + 500), Vn(e, t));
    do
      try {
        by();
        break;
      } catch (l) {
        ap(e, l);
      }
    while (!0);
    xu(),
      (vs.current = o),
      (V = i),
      de !== null ? (t = 0) : ((ge = null), (we = 0), (t = pe));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = ea(e)), i !== 0 && ((r = i), (t = Oa(e, i)))), t === 1)
    )
      throw ((n = Hi), Vn(e, 0), tn(e, r), Fe(e, ue()), n);
    if (t === 6) tn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Ay(i) &&
          ((t = Cs(e, r)),
          t === 2 && ((o = ea(e)), o !== 0 && ((r = o), (t = Oa(e, o)))),
          t === 1))
      )
        throw ((n = Hi), Vn(e, 0), tn(e, r), Fe(e, ue()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(P(345));
        case 2:
          Ln(e, Ae, Dt);
          break;
        case 3:
          if (
            (tn(e, r), (r & 130023424) === r && ((t = Au + 500 - ue()), 10 < t))
          ) {
            if (rs(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Le(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = aa(Ln.bind(null, e, Ae, Dt), t);
            break;
          }
          Ln(e, Ae, Dt);
          break;
        case 4:
          if ((tn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - ht(r);
            (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
          }
          if (
            ((r = i),
            (r = ue() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Dy(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = aa(Ln.bind(null, e, Ae, Dt), r);
            break;
          }
          Ln(e, Ae, Dt);
          break;
        case 5:
          Ln(e, Ae, Dt);
          break;
        default:
          throw Error(P(329));
      }
    }
  }
  return Fe(e, ue()), e.callbackNode === n ? lp.bind(null, e) : null;
}
function Oa(e, t) {
  var n = Ni;
  return (
    e.current.memoizedState.isDehydrated && (Vn(e, t).flags |= 256),
    (e = Cs(e, t)),
    e !== 2 && ((t = Ae), (Ae = n), t !== null && Pa(t)),
    e
  );
}
function Pa(e) {
  Ae === null ? (Ae = e) : Ae.push.apply(Ae, e);
}
function Ay(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!mt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function tn(e, t) {
  for (
    t &= ~Du,
      t &= ~Bs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - ht(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Cd(e) {
  if (V & 6) throw Error(P(327));
  Er();
  var t = rs(e, 0);
  if (!(t & 1)) return Fe(e, ue()), null;
  var n = Cs(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ea(e);
    r !== 0 && ((t = r), (n = Oa(e, r)));
  }
  if (n === 1) throw ((n = Hi), Vn(e, 0), tn(e, t), Fe(e, ue()), n);
  if (n === 6) throw Error(P(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Ln(e, Ae, Dt),
    Fe(e, ue()),
    null
  );
}
function _u(e, t) {
  var n = V;
  V |= 1;
  try {
    return e(t);
  } finally {
    (V = n), V === 0 && ((Vr = ue() + 500), Fs && kn());
  }
}
function Zn(e) {
  dn !== null && dn.tag === 0 && !(V & 6) && Er();
  var t = V;
  V |= 1;
  var n = et.transition,
    r = K;
  try {
    if (((et.transition = null), (K = 1), e)) return e();
  } finally {
    (K = r), (et.transition = n), (V = t), !(V & 6) && kn();
  }
}
function bu() {
  (Ue = yr.current), Y(yr);
}
function Vn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), cy(n)), de !== null))
    for (n = de.return; n !== null; ) {
      var r = n;
      switch ((gu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && as();
          break;
        case 3:
          Br(), Y(be), Y(je), ku();
          break;
        case 5:
          Nu(r);
          break;
        case 4:
          Br();
          break;
        case 13:
          Y(ee);
          break;
        case 19:
          Y(ee);
          break;
        case 10:
          wu(r.type._context);
          break;
        case 22:
        case 23:
          bu();
      }
      n = n.return;
    }
  if (
    ((ge = e),
    (de = e = xn(e.current, null)),
    (we = Ue = t),
    (pe = 0),
    (Hi = null),
    (Du = Bs = qn = 0),
    (Ae = Ni = null),
    _n !== null)
  ) {
    for (t = 0; t < _n.length; t++)
      if (((n = _n[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          (o.next = i), (r.next = s);
        }
        n.pending = r;
      }
    _n = null;
  }
  return e;
}
function ap(e, t) {
  do {
    var n = de;
    try {
      if ((xu(), (Vo.current = ys), gs)) {
        for (var r = te.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        gs = !1;
      }
      if (
        ((Gn = 0),
        (me = he = te = null),
        (Si = !1),
        ($i = 0),
        (Iu.current = null),
        n === null || n.return === null)
      ) {
        (pe = 1), (Hi = t), (de = null);
        break;
      }
      e: {
        var o = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = we),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var c = a,
            d = l,
            m = d.tag;
          if (!(d.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = d.alternate;
            p
              ? ((d.updateQueue = p.updateQueue),
                (d.memoizedState = p.memoizedState),
                (d.lanes = p.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var v = ad(s);
          if (v !== null) {
            (v.flags &= -257),
              ud(v, s, l, o, t),
              v.mode & 1 && ld(o, c, t),
              (t = v),
              (a = c);
            var x = t.updateQueue;
            if (x === null) {
              var w = new Set();
              w.add(a), (t.updateQueue = w);
            } else x.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              ld(o, c, t), Mu();
              break e;
            }
            a = Error(P(426));
          }
        } else if (J && l.mode & 1) {
          var E = ad(s);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256),
              ud(E, s, l, o, t),
              yu(Hr(a, l));
            break e;
          }
        }
        (o = a = Hr(a, l)),
          pe !== 4 && (pe = 2),
          Ni === null ? (Ni = [o]) : Ni.push(o),
          (o = s);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var h = Qh(o, a, t);
              td(o, h);
              break e;
            case 1:
              l = a;
              var g = o.type,
                y = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof g.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (yn === null || !yn.has(y))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var S = Wh(o, l, t);
                td(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      dp(n);
    } catch (N) {
      (t = N), de === n && n !== null && (de = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function up() {
  var e = vs.current;
  return (vs.current = ys), e === null ? ys : e;
}
function Mu() {
  (pe === 0 || pe === 3 || pe === 2) && (pe = 4),
    ge === null || (!(qn & 268435455) && !(Bs & 268435455)) || tn(ge, we);
}
function Cs(e, t) {
  var n = V;
  V |= 2;
  var r = up();
  (ge !== e || we !== t) && ((Dt = null), Vn(e, t));
  do
    try {
      _y();
      break;
    } catch (i) {
      ap(e, i);
    }
  while (!0);
  if ((xu(), (V = n), (vs.current = r), de !== null)) throw Error(P(261));
  return (ge = null), (we = 0), pe;
}
function _y() {
  for (; de !== null; ) cp(de);
}
function by() {
  for (; de !== null && !lg(); ) cp(de);
}
function cp(e) {
  var t = hp(e.alternate, e, Ue);
  (e.memoizedProps = e.pendingProps),
    t === null ? dp(e) : (de = t),
    (Iu.current = null);
}
function dp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Py(n, t)), n !== null)) {
        (n.flags &= 32767), (de = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (pe = 6), (de = null);
        return;
      }
    } else if (((n = Oy(n, t, Ue)), n !== null)) {
      de = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      de = t;
      return;
    }
    de = t = e;
  } while (t !== null);
  pe === 0 && (pe = 5);
}
function Ln(e, t, n) {
  var r = K,
    i = et.transition;
  try {
    (et.transition = null), (K = 1), My(e, t, n, r);
  } finally {
    (et.transition = i), (K = r);
  }
  return null;
}
function My(e, t, n, r) {
  do Er();
  while (dn !== null);
  if (V & 6) throw Error(P(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(P(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (yg(e, o),
    e === ge && ((de = ge = null), (we = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Lo ||
      ((Lo = !0),
      pp(ns, function () {
        return Er(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = et.transition), (et.transition = null);
    var s = K;
    K = 1;
    var l = V;
    (V |= 4),
      (Iu.current = null),
      Ry(e, n),
      op(n, e),
      ry(sa),
      (is = !!oa),
      (sa = oa = null),
      (e.current = n),
      Iy(n),
      ag(),
      (V = l),
      (K = s),
      (et.transition = o);
  } else e.current = n;
  if (
    (Lo && ((Lo = !1), (dn = e), (ws = i)),
    (o = e.pendingLanes),
    o === 0 && (yn = null),
    dg(n.stateNode),
    Fe(e, ue()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (xs) throw ((xs = !1), (e = ja), (ja = null), e);
  return (
    ws & 1 && e.tag !== 0 && Er(),
    (o = e.pendingLanes),
    o & 1 ? (e === Ta ? ki++ : ((ki = 0), (Ta = e))) : (ki = 0),
    kn(),
    null
  );
}
function Er() {
  if (dn !== null) {
    var e = Qf(ws),
      t = et.transition,
      n = K;
    try {
      if (((et.transition = null), (K = 16 > e ? 16 : e), dn === null))
        var r = !1;
      else {
        if (((e = dn), (dn = null), (ws = 0), V & 6)) throw Error(P(331));
        var i = V;
        for (V |= 4, D = e.current; D !== null; ) {
          var o = D,
            s = o.child;
          if (D.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var c = l[a];
                for (D = c; D !== null; ) {
                  var d = D;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ei(8, d, o);
                  }
                  var m = d.child;
                  if (m !== null) (m.return = d), (D = m);
                  else
                    for (; D !== null; ) {
                      d = D;
                      var p = d.sibling,
                        v = d.return;
                      if ((np(d), d === c)) {
                        D = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = v), (D = p);
                        break;
                      }
                      D = v;
                    }
                }
              }
              var x = o.alternate;
              if (x !== null) {
                var w = x.child;
                if (w !== null) {
                  x.child = null;
                  do {
                    var E = w.sibling;
                    (w.sibling = null), (w = E);
                  } while (w !== null);
                }
              }
              D = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) (s.return = o), (D = s);
          else
            e: for (; D !== null; ) {
              if (((o = D), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ei(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                (h.return = o.return), (D = h);
                break e;
              }
              D = o.return;
            }
        }
        var g = e.current;
        for (D = g; D !== null; ) {
          s = D;
          var y = s.child;
          if (s.subtreeFlags & 2064 && y !== null) (y.return = s), (D = y);
          else
            e: for (s = g; D !== null; ) {
              if (((l = D), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Us(9, l);
                  }
                } catch (N) {
                  oe(l, l.return, N);
                }
              if (l === s) {
                D = null;
                break e;
              }
              var S = l.sibling;
              if (S !== null) {
                (S.return = l.return), (D = S);
                break e;
              }
              D = l.return;
            }
        }
        if (
          ((V = i), kn(), Tt && typeof Tt.onPostCommitFiberRoot == "function")
        )
          try {
            Tt.onPostCommitFiberRoot(Ds, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (K = n), (et.transition = t);
    }
  }
  return !1;
}
function Sd(e, t, n) {
  (t = Hr(n, t)),
    (t = Qh(e, t, 1)),
    (e = gn(e, t, 1)),
    (t = Le()),
    e !== null && (to(e, 1, t), Fe(e, t));
}
function oe(e, t, n) {
  if (e.tag === 3) Sd(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Sd(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (yn === null || !yn.has(r)))
        ) {
          (e = Hr(n, e)),
            (e = Wh(t, e, 1)),
            (t = gn(t, e, 1)),
            (e = Le()),
            t !== null && (to(t, 1, e), Fe(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Fy(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Le()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ge === e &&
      (we & n) === n &&
      (pe === 4 || (pe === 3 && (we & 130023424) === we && 500 > ue() - Au)
        ? Vn(e, 0)
        : (Du |= n)),
    Fe(e, t);
}
function fp(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = wo), (wo <<= 1), !(wo & 130023424) && (wo = 4194304))
      : (t = 1));
  var n = Le();
  (e = Ht(e, t)), e !== null && (to(e, t, n), Fe(e, n));
}
function zy(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), fp(e, n);
}
function $y(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(P(314));
  }
  r !== null && r.delete(t), fp(e, n);
}
var hp;
hp = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || be.current) _e = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (_e = !1), Ty(e, t, n);
      _e = !!(e.flags & 131072);
    }
  else (_e = !1), J && t.flags & 1048576 && yh(t, ds, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Wo(e, t), (e = t.pendingProps);
      var i = zr(t, je.current);
      Sr(t, n), (i = Tu(null, t, r, e, i, n));
      var o = Ou();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Me(r) ? ((o = !0), us(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Su(t),
            (i.updater = $s),
            (t.stateNode = i),
            (i._reactInternals = t),
            ma(t, r, e, n),
            (t = va(null, t, r, !0, o, n)))
          : ((t.tag = 0), J && o && mu(t), Pe(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Wo(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = By(r)),
          (e = at(r, e)),
          i)
        ) {
          case 0:
            t = ya(null, t, r, e, n);
            break e;
          case 1:
            t = fd(null, t, r, e, n);
            break e;
          case 11:
            t = cd(null, t, r, e, n);
            break e;
          case 14:
            t = dd(null, t, r, at(r.type, e), n);
            break e;
        }
        throw Error(P(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        ya(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        fd(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Zh(t), e === null)) throw Error(P(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Eh(e, t),
          ps(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = Hr(Error(P(423)), t)), (t = hd(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Hr(Error(P(424)), t)), (t = hd(e, t, r, n, i));
            break e;
          } else
            for (
              Be = mn(t.stateNode.containerInfo.firstChild),
                He = t,
                J = !0,
                dt = null,
                n = Ch(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if (($r(), r === i)) {
            t = Vt(e, t, n);
            break e;
          }
          Pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Nh(t),
        e === null && fa(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        la(r, i) ? (s = null) : o !== null && la(r, o) && (t.flags |= 32),
        qh(e, t),
        Pe(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && fa(t), null;
    case 13:
      return Yh(e, t, n);
    case 4:
      return (
        Eu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Ur(t, null, r, n)) : Pe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        cd(e, t, r, i, n)
      );
    case 7:
      return Pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return Pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          q(fs, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (mt(o.value, s)) {
            if (o.children === i.children && !be.current) {
              t = Vt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                s = o.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = Ft(-1, n & -n)), (a.tag = 2);
                      var c = o.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        d === null
                          ? (a.next = a)
                          : ((a.next = d.next), (d.next = a)),
                          (c.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      ha(o.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(P(341));
                (s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  ha(s, n, t),
                  (s = o.sibling);
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    (o.return = s.return), (s = o);
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        Pe(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Sr(t, n),
        (i = tt(i)),
        (r = r(i)),
        (t.flags |= 1),
        Pe(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = at(r, t.pendingProps)),
        (i = at(r.type, i)),
        dd(e, t, r, i, n)
      );
    case 15:
      return Kh(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        Wo(e, t),
        (t.tag = 1),
        Me(r) ? ((e = !0), us(t)) : (e = !1),
        Sr(t, n),
        Vh(t, r, i),
        ma(t, r, i, n),
        va(null, t, r, !0, e, n)
      );
    case 19:
      return Jh(e, t, n);
    case 22:
      return Gh(e, t, n);
  }
  throw Error(P(156, t.tag));
};
function pp(e, t) {
  return Uf(e, t);
}
function Uy(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Xe(e, t, n, r) {
  return new Uy(e, t, n, r);
}
function Fu(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function By(e) {
  if (typeof e == "function") return Fu(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ru)) return 11;
    if (e === iu) return 14;
  }
  return 2;
}
function xn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Xe(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function qo(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == "function")) Fu(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case lr:
        return Qn(n.children, i, o, t);
      case nu:
        (s = 8), (i |= 8);
        break;
      case zl:
        return (
          (e = Xe(12, n, t, i | 2)), (e.elementType = zl), (e.lanes = o), e
        );
      case $l:
        return (e = Xe(13, n, t, i)), (e.elementType = $l), (e.lanes = o), e;
      case Ul:
        return (e = Xe(19, n, t, i)), (e.elementType = Ul), (e.lanes = o), e;
      case Nf:
        return Hs(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Sf:
              s = 10;
              break e;
            case Ef:
              s = 9;
              break e;
            case ru:
              s = 11;
              break e;
            case iu:
              s = 14;
              break e;
            case Jt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(P(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Xe(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Qn(e, t, n, r) {
  return (e = Xe(7, e, r, t)), (e.lanes = n), e;
}
function Hs(e, t, n, r) {
  return (
    (e = Xe(22, e, r, t)),
    (e.elementType = Nf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ol(e, t, n) {
  return (e = Xe(6, e, null, t)), (e.lanes = n), e;
}
function Pl(e, t, n) {
  return (
    (t = Xe(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Hy(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ul(0)),
    (this.expirationTimes = ul(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ul(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function zu(e, t, n, r, i, o, s, l, a) {
  return (
    (e = new Hy(e, t, n, l, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Xe(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Su(o),
    e
  );
}
function Vy(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: sr,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function mp(e) {
  if (!e) return Cn;
  e = e._reactInternals;
  e: {
    if (Xn(e) !== e || e.tag !== 1) throw Error(P(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Me(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(P(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Me(n)) return mh(e, n, t);
  }
  return t;
}
function gp(e, t, n, r, i, o, s, l, a) {
  return (
    (e = zu(n, r, !0, e, i, o, s, l, a)),
    (e.context = mp(null)),
    (n = e.current),
    (r = Le()),
    (i = vn(n)),
    (o = Ft(r, i)),
    (o.callback = t ?? null),
    gn(n, o, i),
    (e.current.lanes = i),
    to(e, i, r),
    Fe(e, r),
    e
  );
}
function Vs(e, t, n, r) {
  var i = t.current,
    o = Le(),
    s = vn(i);
  return (
    (n = mp(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ft(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = gn(i, t, s)),
    e !== null && (pt(e, i, s, o), Ho(e, i, s)),
    s
  );
}
function Ss(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ed(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function $u(e, t) {
  Ed(e, t), (e = e.alternate) && Ed(e, t);
}
function Qy() {
  return null;
}
var yp =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Uu(e) {
  this._internalRoot = e;
}
Qs.prototype.render = Uu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(P(409));
  Vs(e, t, null, null);
};
Qs.prototype.unmount = Uu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Zn(function () {
      Vs(null, e, null, null);
    }),
      (t[Bt] = null);
  }
};
function Qs(e) {
  this._internalRoot = e;
}
Qs.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Gf();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < en.length && t !== 0 && t < en[n].priority; n++);
    en.splice(n, 0, e), n === 0 && Zf(e);
  }
};
function Bu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ws(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Nd() {}
function Wy(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var c = Ss(s);
        o.call(c);
      };
    }
    var s = gp(t, r, e, 0, null, !1, !1, "", Nd);
    return (
      (e._reactRootContainer = s),
      (e[Bt] = s.current),
      _i(e.nodeType === 8 ? e.parentNode : e),
      Zn(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var c = Ss(a);
      l.call(c);
    };
  }
  var a = zu(e, 0, !1, null, null, !1, !1, "", Nd);
  return (
    (e._reactRootContainer = a),
    (e[Bt] = a.current),
    _i(e.nodeType === 8 ? e.parentNode : e),
    Zn(function () {
      Vs(t, a, n, r);
    }),
    a
  );
}
function Ks(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var l = i;
      i = function () {
        var a = Ss(s);
        l.call(a);
      };
    }
    Vs(t, s, e, i);
  } else s = Wy(n, t, e, i, r);
  return Ss(s);
}
Wf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = fi(t.pendingLanes);
        n !== 0 &&
          (lu(t, n | 1), Fe(t, ue()), !(V & 6) && ((Vr = ue() + 500), kn()));
      }
      break;
    case 13:
      Zn(function () {
        var r = Ht(e, 1);
        if (r !== null) {
          var i = Le();
          pt(r, e, 1, i);
        }
      }),
        $u(e, 1);
  }
};
au = function (e) {
  if (e.tag === 13) {
    var t = Ht(e, 134217728);
    if (t !== null) {
      var n = Le();
      pt(t, e, 134217728, n);
    }
    $u(e, 134217728);
  }
};
Kf = function (e) {
  if (e.tag === 13) {
    var t = vn(e),
      n = Ht(e, t);
    if (n !== null) {
      var r = Le();
      pt(n, e, t, r);
    }
    $u(e, t);
  }
};
Gf = function () {
  return K;
};
qf = function (e, t) {
  var n = K;
  try {
    return (K = e), t();
  } finally {
    K = n;
  }
};
Yl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Vl(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Ms(r);
            if (!i) throw Error(P(90));
            jf(r), Vl(r, i);
          }
        }
      }
      break;
    case "textarea":
      Of(e, n);
      break;
    case "select":
      (t = n.value), t != null && vr(e, !!n.multiple, t, !1);
  }
};
_f = _u;
bf = Zn;
var Ky = { usingClientEntryPoint: !1, Events: [ro, dr, Ms, Df, Af, _u] },
  ai = {
    findFiberByHostInstance: An,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Gy = {
    bundleType: ai.bundleType,
    version: ai.version,
    rendererPackageName: ai.rendererPackageName,
    rendererConfig: ai.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Wt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = zf(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: ai.findFiberByHostInstance || Qy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ro = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ro.isDisabled && Ro.supportsFiber)
    try {
      (Ds = Ro.inject(Gy)), (Tt = Ro);
    } catch {}
}
Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ky;
Qe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Bu(t)) throw Error(P(200));
  return Vy(e, t, null, n);
};
Qe.createRoot = function (e, t) {
  if (!Bu(e)) throw Error(P(299));
  var n = !1,
    r = "",
    i = yp;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = zu(e, 1, !1, null, null, n, !1, r, i)),
    (e[Bt] = t.current),
    _i(e.nodeType === 8 ? e.parentNode : e),
    new Uu(t)
  );
};
Qe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(P(188))
      : ((e = Object.keys(e).join(",")), Error(P(268, e)));
  return (e = zf(t)), (e = e === null ? null : e.stateNode), e;
};
Qe.flushSync = function (e) {
  return Zn(e);
};
Qe.hydrate = function (e, t, n) {
  if (!Ws(t)) throw Error(P(200));
  return Ks(null, e, t, !0, n);
};
Qe.hydrateRoot = function (e, t, n) {
  if (!Bu(e)) throw Error(P(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    s = yp;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = gp(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[Bt] = t.current),
    _i(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Qs(t);
};
Qe.render = function (e, t, n) {
  if (!Ws(t)) throw Error(P(200));
  return Ks(null, e, t, !1, n);
};
Qe.unmountComponentAtNode = function (e) {
  if (!Ws(e)) throw Error(P(40));
  return e._reactRootContainer
    ? (Zn(function () {
        Ks(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Bt] = null);
        });
      }),
      !0)
    : !1;
};
Qe.unstable_batchedUpdates = _u;
Qe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ws(n)) throw Error(P(200));
  if (e == null || e._reactInternals === void 0) throw Error(P(38));
  return Ks(e, t, n, !1, r);
};
Qe.version = "18.3.1-next-f1338f8080-20240426";
function vp() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vp);
    } catch (e) {
      console.error(e);
    }
}
vp(), (vf.exports = Qe);
var Gs = vf.exports;
const Io = Rs(Gs);
var xp,
  kd = Gs;
(xp = kd.createRoot), kd.hydrateRoot;
var Hu = {};
Object.defineProperty(Hu, "__esModule", { value: !0 });
Hu.parse = tv;
Hu.serialize = nv;
const qy = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
  Zy = /^[\u0021-\u003A\u003C-\u007E]*$/,
  Yy =
    /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  Jy = /^[\u0020-\u003A\u003D-\u007E]*$/,
  Xy = Object.prototype.toString,
  ev = (() => {
    const e = function () {};
    return (e.prototype = Object.create(null)), e;
  })();
function tv(e, t) {
  const n = new ev(),
    r = e.length;
  if (r < 2) return n;
  const i = (t == null ? void 0 : t.decode) || rv;
  let o = 0;
  do {
    const s = e.indexOf("=", o);
    if (s === -1) break;
    const l = e.indexOf(";", o),
      a = l === -1 ? r : l;
    if (s > a) {
      o = e.lastIndexOf(";", s - 1) + 1;
      continue;
    }
    const c = jd(e, o, s),
      d = Td(e, s, c),
      m = e.slice(c, d);
    if (n[m] === void 0) {
      let p = jd(e, s + 1, a),
        v = Td(e, a, p);
      const x = i(e.slice(p, v));
      n[m] = x;
    }
    o = a + 1;
  } while (o < r);
  return n;
}
function jd(e, t, n) {
  do {
    const r = e.charCodeAt(t);
    if (r !== 32 && r !== 9) return t;
  } while (++t < n);
  return n;
}
function Td(e, t, n) {
  for (; t > n; ) {
    const r = e.charCodeAt(--t);
    if (r !== 32 && r !== 9) return t + 1;
  }
  return n;
}
function nv(e, t, n) {
  const r = (n == null ? void 0 : n.encode) || encodeURIComponent;
  if (!qy.test(e)) throw new TypeError(`argument name is invalid: ${e}`);
  const i = r(t);
  if (!Zy.test(i)) throw new TypeError(`argument val is invalid: ${t}`);
  let o = e + "=" + i;
  if (!n) return o;
  if (n.maxAge !== void 0) {
    if (!Number.isInteger(n.maxAge))
      throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
    o += "; Max-Age=" + n.maxAge;
  }
  if (n.domain) {
    if (!Yy.test(n.domain))
      throw new TypeError(`option domain is invalid: ${n.domain}`);
    o += "; Domain=" + n.domain;
  }
  if (n.path) {
    if (!Jy.test(n.path))
      throw new TypeError(`option path is invalid: ${n.path}`);
    o += "; Path=" + n.path;
  }
  if (n.expires) {
    if (!iv(n.expires) || !Number.isFinite(n.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${n.expires}`);
    o += "; Expires=" + n.expires.toUTCString();
  }
  if (
    (n.httpOnly && (o += "; HttpOnly"),
    n.secure && (o += "; Secure"),
    n.partitioned && (o += "; Partitioned"),
    n.priority)
  )
    switch (typeof n.priority == "string" ? n.priority.toLowerCase() : void 0) {
      case "low":
        o += "; Priority=Low";
        break;
      case "medium":
        o += "; Priority=Medium";
        break;
      case "high":
        o += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${n.priority}`);
    }
  if (n.sameSite)
    switch (
      typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite
    ) {
      case !0:
      case "strict":
        o += "; SameSite=Strict";
        break;
      case "lax":
        o += "; SameSite=Lax";
        break;
      case "none":
        o += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${n.sameSite}`);
    }
  return o;
}
function rv(e) {
  if (e.indexOf("%") === -1) return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function iv(e) {
  return Xy.call(e) === "[object Date]";
}
/**
 * react-router v7.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Od = "popstate";
function ov(e = {}) {
  function t(r, i) {
    let { pathname: o, search: s, hash: l } = r.location;
    return La(
      "",
      { pathname: o, search: s, hash: l },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : Vi(i);
  }
  return lv(t, n, null, e);
}
function X(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function gt(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function sv() {
  return Math.random().toString(36).substring(2, 10);
}
function Pd(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function La(e, t, n = null, r) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? Zr(t) : t),
    state: n,
    key: (t && t.key) || r || sv(),
  };
}
function Vi({ pathname: e = "/", search: t = "", hash: n = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n),
    e
  );
}
function Zr(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function lv(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    s = i.history,
    l = "POP",
    a = null,
    c = d();
  c == null && ((c = 0), s.replaceState({ ...s.state, idx: c }, ""));
  function d() {
    return (s.state || { idx: null }).idx;
  }
  function m() {
    l = "POP";
    let E = d(),
      h = E == null ? null : E - c;
    (c = E), a && a({ action: l, location: w.location, delta: h });
  }
  function p(E, h) {
    l = "PUSH";
    let g = La(w.location, E, h);
    c = d() + 1;
    let y = Pd(g, c),
      S = w.createHref(g);
    try {
      s.pushState(y, "", S);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      i.location.assign(S);
    }
    o && a && a({ action: l, location: w.location, delta: 1 });
  }
  function v(E, h) {
    l = "REPLACE";
    let g = La(w.location, E, h);
    c = d();
    let y = Pd(g, c),
      S = w.createHref(g);
    s.replaceState(y, "", S),
      o && a && a({ action: l, location: w.location, delta: 0 });
  }
  function x(E) {
    let h = i.location.origin !== "null" ? i.location.origin : i.location.href,
      g = typeof E == "string" ? E : Vi(E);
    return (
      (g = g.replace(/ $/, "%20")),
      X(
        h,
        `No window.location.(origin|href) available to create URL for href: ${g}`,
      ),
      new URL(g, h)
    );
  }
  let w = {
    get action() {
      return l;
    },
    get location() {
      return e(i, s);
    },
    listen(E) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Od, m),
        (a = E),
        () => {
          i.removeEventListener(Od, m), (a = null);
        }
      );
    },
    createHref(E) {
      return t(i, E);
    },
    createURL: x,
    encodeLocation(E) {
      let h = x(E);
      return { pathname: h.pathname, search: h.search, hash: h.hash };
    },
    push: p,
    replace: v,
    go(E) {
      return s.go(E);
    },
  };
  return w;
}
function wp(e, t, n = "/") {
  return av(e, t, n, !1);
}
function av(e, t, n, r) {
  let i = typeof t == "string" ? Zr(t) : t,
    o = Sn(i.pathname || "/", n);
  if (o == null) return null;
  let s = Cp(e);
  uv(s);
  let l = null;
  for (let a = 0; l == null && a < s.length; ++a) {
    let c = wv(o);
    l = vv(s[a], c, r);
  }
  return l;
}
function Cp(e, t = [], n = [], r = "") {
  let i = (o, s, l) => {
    let a = {
      relativePath: l === void 0 ? o.path || "" : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o,
    };
    a.relativePath.startsWith("/") &&
      (X(
        a.relativePath.startsWith(r),
        `Absolute route path "${a.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let c = zt([r, a.relativePath]),
      d = n.concat(a);
    o.children &&
      o.children.length > 0 &&
      (X(
        o.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${c}".`,
      ),
      Cp(o.children, t, d, c)),
      !(o.path == null && !o.index) &&
        t.push({ path: c, score: gv(c, o.index), routesMeta: d });
  };
  return (
    e.forEach((o, s) => {
      var l;
      if (o.path === "" || !((l = o.path) != null && l.includes("?"))) i(o, s);
      else for (let a of Sp(o.path)) i(o, s, a);
    }),
    t
  );
}
function Sp(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let s = Sp(r.join("/")),
    l = [];
  return (
    l.push(...s.map((a) => (a === "" ? o : [o, a].join("/")))),
    i && l.push(...s),
    l.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function uv(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : yv(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
var cv = /^:[\w-]+$/,
  dv = 3,
  fv = 2,
  hv = 1,
  pv = 10,
  mv = -2,
  Ld = (e) => e === "*";
function gv(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Ld) && (r += mv),
    t && (r += fv),
    n
      .filter((i) => !Ld(i))
      .reduce((i, o) => i + (cv.test(o) ? dv : o === "" ? hv : pv), r)
  );
}
function yv(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function vv(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    o = "/",
    s = [];
  for (let l = 0; l < r.length; ++l) {
    let a = r[l],
      c = l === r.length - 1,
      d = o === "/" ? t : t.slice(o.length) || "/",
      m = Es(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: c },
        d,
      ),
      p = a.route;
    if (
      (!m &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (m = Es(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          d,
        )),
      !m)
    )
      return null;
    Object.assign(i, m.params),
      s.push({
        params: i,
        pathname: zt([o, m.pathname]),
        pathnameBase: Nv(zt([o, m.pathnameBase])),
        route: p,
      }),
      m.pathnameBase !== "/" && (o = zt([o, m.pathnameBase]));
  }
  return s;
}
function Es(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = xv(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    s = o.replace(/(.)\/+$/, "$1"),
    l = i.slice(1);
  return {
    params: r.reduce((c, { paramName: d, isOptional: m }, p) => {
      if (d === "*") {
        let x = l[p] || "";
        s = o.slice(0, o.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const v = l[p];
      return (
        m && !v ? (c[d] = void 0) : (c[d] = (v || "").replace(/%2F/g, "/")), c
      );
    }, {}),
    pathname: o,
    pathnameBase: s,
    pattern: e,
  };
}
function xv(e, t = !1, n = !0) {
  gt(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, l, a) => (
            r.push({ paramName: l, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (i += "\\/*$")
        : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function wv(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      gt(
        !1,
        `The URL path "${e}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function Sn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Cv(e, t = "/") {
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? Zr(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Sv(n, t)) : t,
    search: kv(r),
    hash: jv(i),
  };
}
function Sv(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Ll(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ev(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Vu(e) {
  let t = Ev(e);
  return t.map((n, r) => (r === t.length - 1 ? n.pathname : n.pathnameBase));
}
function Qu(e, t, n, r = !1) {
  let i;
  typeof e == "string"
    ? (i = Zr(e))
    : ((i = { ...e }),
      X(
        !i.pathname || !i.pathname.includes("?"),
        Ll("?", "pathname", "search", i),
      ),
      X(
        !i.pathname || !i.pathname.includes("#"),
        Ll("#", "pathname", "hash", i),
      ),
      X(!i.search || !i.search.includes("#"), Ll("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    s = o ? "/" : i.pathname,
    l;
  if (s == null) l = n;
  else {
    let m = t.length - 1;
    if (!r && s.startsWith("..")) {
      let p = s.split("/");
      for (; p[0] === ".."; ) p.shift(), (m -= 1);
      i.pathname = p.join("/");
    }
    l = m >= 0 ? t[m] : "/";
  }
  let a = Cv(i, l),
    c = s && s !== "/" && s.endsWith("/"),
    d = (o || s === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (c || d) && (a.pathname += "/"), a;
}
var zt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Nv = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  kv = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  jv = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Tv(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var Ep = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Ep);
var Ov = ["GET", ...Ep];
new Set(Ov);
var Yr = f.createContext(null);
Yr.displayName = "DataRouter";
var qs = f.createContext(null);
qs.displayName = "DataRouterState";
var Np = f.createContext({ isTransitioning: !1 });
Np.displayName = "ViewTransition";
var Pv = f.createContext(new Map());
Pv.displayName = "Fetchers";
var Lv = f.createContext(null);
Lv.displayName = "Await";
var vt = f.createContext(null);
vt.displayName = "Navigation";
var oo = f.createContext(null);
oo.displayName = "Location";
var rt = f.createContext({ outlet: null, matches: [], isDataRoute: !1 });
rt.displayName = "Route";
var Wu = f.createContext(null);
Wu.displayName = "RouteError";
function Rv(e, { relative: t } = {}) {
  X(Jr(), "useHref() may be used only in the context of a <Router> component.");
  let { basename: n, navigator: r } = f.useContext(vt),
    { hash: i, pathname: o, search: s } = so(e, { relative: t }),
    l = o;
  return (
    n !== "/" && (l = o === "/" ? n : zt([n, o])),
    r.createHref({ pathname: l, search: s, hash: i })
  );
}
function Jr() {
  return f.useContext(oo) != null;
}
function Kt() {
  return (
    X(
      Jr(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    f.useContext(oo).location
  );
}
var kp =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function jp(e) {
  f.useContext(vt).static || f.useLayoutEffect(e);
}
function ze() {
  let { isDataRoute: e } = f.useContext(rt);
  return e ? Wv() : Iv();
}
function Iv() {
  X(
    Jr(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = f.useContext(Yr),
    { basename: t, navigator: n } = f.useContext(vt),
    { matches: r } = f.useContext(rt),
    { pathname: i } = Kt(),
    o = JSON.stringify(Vu(r)),
    s = f.useRef(!1);
  return (
    jp(() => {
      s.current = !0;
    }),
    f.useCallback(
      (a, c = {}) => {
        if ((gt(s.current, kp), !s.current)) return;
        if (typeof a == "number") {
          n.go(a);
          return;
        }
        let d = Qu(a, JSON.parse(o), i, c.relative === "path");
        e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : zt([t, d.pathname])),
          (c.replace ? n.replace : n.push)(d, c.state, c);
      },
      [t, n, o, i, e],
    )
  );
}
var Dv = f.createContext(null);
function Av(e) {
  let t = f.useContext(rt).outlet;
  return t && f.createElement(Dv.Provider, { value: e }, t);
}
function Xr() {
  let { matches: e } = f.useContext(rt),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function so(e, { relative: t } = {}) {
  let { matches: n } = f.useContext(rt),
    { pathname: r } = Kt(),
    i = JSON.stringify(Vu(n));
  return f.useMemo(() => Qu(e, JSON.parse(i), r, t === "path"), [e, i, r, t]);
}
function _v(e, t) {
  return Tp(e, t);
}
function Tp(e, t, n, r) {
  var h;
  X(
    Jr(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: i } = f.useContext(vt),
    { matches: o } = f.useContext(rt),
    s = o[o.length - 1],
    l = s ? s.params : {},
    a = s ? s.pathname : "/",
    c = s ? s.pathnameBase : "/",
    d = s && s.route;
  {
    let g = (d && d.path) || "";
    Op(
      a,
      !d || g.endsWith("*") || g.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${a}" (under <Route path="${g}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${g}"> to <Route path="${g === "/" ? "*" : `${g}/*`}">.`,
    );
  }
  let m = Kt(),
    p;
  if (t) {
    let g = typeof t == "string" ? Zr(t) : t;
    X(
      c === "/" || ((h = g.pathname) == null ? void 0 : h.startsWith(c)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${g.pathname}" was given in the \`location\` prop.`,
    ),
      (p = g);
  } else p = m;
  let v = p.pathname || "/",
    x = v;
  if (c !== "/") {
    let g = c.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(g.length).join("/");
  }
  let w = wp(e, { pathname: x });
  gt(
    d || w != null,
    `No routes matched location "${p.pathname}${p.search}${p.hash}" `,
  ),
    gt(
      w == null ||
        w[w.length - 1].route.element !== void 0 ||
        w[w.length - 1].route.Component !== void 0 ||
        w[w.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let E = $v(
    w &&
      w.map((g) =>
        Object.assign({}, g, {
          params: Object.assign({}, l, g.params),
          pathname: zt([
            c,
            i.encodeLocation
              ? i.encodeLocation(g.pathname).pathname
              : g.pathname,
          ]),
          pathnameBase:
            g.pathnameBase === "/"
              ? c
              : zt([
                  c,
                  i.encodeLocation
                    ? i.encodeLocation(g.pathnameBase).pathname
                    : g.pathnameBase,
                ]),
        }),
      ),
    o,
    n,
    r,
  );
  return t && E
    ? f.createElement(
        oo.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...p,
            },
            navigationType: "POP",
          },
        },
        E,
      )
    : E;
}
function bv() {
  let e = Qv(),
    t = Tv(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = "rgba(200,200,200, 0.5)",
    i = { padding: "0.5rem", backgroundColor: r },
    o = { padding: "2px 4px", backgroundColor: r },
    s = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (s = f.createElement(
      f.Fragment,
      null,
      f.createElement("p", null, "💿 Hey developer 👋"),
      f.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        f.createElement("code", { style: o }, "ErrorBoundary"),
        " or",
        " ",
        f.createElement("code", { style: o }, "errorElement"),
        " prop on your route.",
      ),
    )),
    f.createElement(
      f.Fragment,
      null,
      f.createElement("h2", null, "Unexpected Application Error!"),
      f.createElement("h3", { style: { fontStyle: "italic" } }, t),
      n ? f.createElement("pre", { style: i }, n) : null,
      s,
    )
  );
}
var Mv = f.createElement(bv, null),
  Fv = class extends f.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      console.error(
        "React Router caught the following error during render",
        e,
        t,
      );
    }
    render() {
      return this.state.error !== void 0
        ? f.createElement(
            rt.Provider,
            { value: this.props.routeContext },
            f.createElement(Wu.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function zv({ routeContext: e, match: t, children: n }) {
  let r = f.useContext(Yr);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    f.createElement(rt.Provider, { value: e }, n)
  );
}
function $v(e, t = [], n = null, r = null) {
  if (e == null) {
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else return null;
  }
  let i = e,
    o = n == null ? void 0 : n.errors;
  if (o != null) {
    let a = i.findIndex(
      (c) => c.route.id && (o == null ? void 0 : o[c.route.id]) !== void 0,
    );
    X(
      a >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`,
    ),
      (i = i.slice(0, Math.min(i.length, a + 1)));
  }
  let s = !1,
    l = -1;
  if (n)
    for (let a = 0; a < i.length; a++) {
      let c = i[a];
      if (
        ((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (l = a),
        c.route.id)
      ) {
        let { loaderData: d, errors: m } = n,
          p =
            c.route.loader &&
            !d.hasOwnProperty(c.route.id) &&
            (!m || m[c.route.id] === void 0);
        if (c.route.lazy || p) {
          (s = !0), l >= 0 ? (i = i.slice(0, l + 1)) : (i = [i[0]]);
          break;
        }
      }
    }
  return i.reduceRight((a, c, d) => {
    let m,
      p = !1,
      v = null,
      x = null;
    n &&
      ((m = o && c.route.id ? o[c.route.id] : void 0),
      (v = c.route.errorElement || Mv),
      s &&
        (l < 0 && d === 0
          ? (Op(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (p = !0),
            (x = null))
          : l === d &&
            ((p = !0), (x = c.route.hydrateFallbackElement || null))));
    let w = t.concat(i.slice(0, d + 1)),
      E = () => {
        let h;
        return (
          m
            ? (h = v)
            : p
              ? (h = x)
              : c.route.Component
                ? (h = f.createElement(c.route.Component, null))
                : c.route.element
                  ? (h = c.route.element)
                  : (h = a),
          f.createElement(zv, {
            match: c,
            routeContext: { outlet: a, matches: w, isDataRoute: n != null },
            children: h,
          })
        );
      };
    return n && (c.route.ErrorBoundary || c.route.errorElement || d === 0)
      ? f.createElement(Fv, {
          location: n.location,
          revalidation: n.revalidation,
          component: v,
          error: m,
          children: E(),
          routeContext: { outlet: null, matches: w, isDataRoute: !0 },
        })
      : E();
  }, null);
}
function Ku(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Uv(e) {
  let t = f.useContext(Yr);
  return X(t, Ku(e)), t;
}
function Bv(e) {
  let t = f.useContext(qs);
  return X(t, Ku(e)), t;
}
function Hv(e) {
  let t = f.useContext(rt);
  return X(t, Ku(e)), t;
}
function Gu(e) {
  let t = Hv(e),
    n = t.matches[t.matches.length - 1];
  return (
    X(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  );
}
function Vv() {
  return Gu("useRouteId");
}
function Qv() {
  var r;
  let e = f.useContext(Wu),
    t = Bv("useRouteError"),
    n = Gu("useRouteError");
  return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n];
}
function Wv() {
  let { router: e } = Uv("useNavigate"),
    t = Gu("useNavigate"),
    n = f.useRef(!1);
  return (
    jp(() => {
      n.current = !0;
    }),
    f.useCallback(
      async (i, o = {}) => {
        gt(n.current, kp),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : await e.navigate(i, { fromRouteId: t, ...o }));
      },
      [e, t],
    )
  );
}
var Rd = {};
function Op(e, t, n) {
  !t && !Rd[e] && ((Rd[e] = !0), gt(!1, n));
}
f.memo(Kv);
function Kv({ routes: e, future: t, state: n }) {
  return Tp(e, void 0, n, t);
}
function Pp({ to: e, replace: t, state: n, relative: r }) {
  X(
    Jr(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: i } = f.useContext(vt);
  gt(
    !i,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: o } = f.useContext(rt),
    { pathname: s } = Kt(),
    l = ze(),
    a = Qu(e, Vu(o), s, r === "path"),
    c = JSON.stringify(a);
  return (
    f.useEffect(() => {
      l(JSON.parse(c), { replace: t, state: n, relative: r });
    }, [l, c, r, t, n]),
    null
  );
}
function Lp(e) {
  return Av(e.context);
}
function se(e) {
  X(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function Gv({
  basename: e = "/",
  children: t = null,
  location: n,
  navigationType: r = "POP",
  navigator: i,
  static: o = !1,
}) {
  X(
    !Jr(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let s = e.replace(/^\/*/, "/"),
    l = f.useMemo(
      () => ({ basename: s, navigator: i, static: o, future: {} }),
      [s, i, o],
    );
  typeof n == "string" && (n = Zr(n));
  let {
      pathname: a = "/",
      search: c = "",
      hash: d = "",
      state: m = null,
      key: p = "default",
    } = n,
    v = f.useMemo(() => {
      let x = Sn(a, s);
      return x == null
        ? null
        : {
            location: { pathname: x, search: c, hash: d, state: m, key: p },
            navigationType: r,
          };
    }, [s, a, c, d, m, p, r]);
  return (
    gt(
      v != null,
      `<Router basename="${s}"> is not able to match the URL "${a}${c}${d}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    v == null
      ? null
      : f.createElement(
          vt.Provider,
          { value: l },
          f.createElement(oo.Provider, { children: t, value: v }),
        )
  );
}
function qv({ children: e, location: t }) {
  return _v(Ra(e), t);
}
function Ra(e, t = []) {
  let n = [];
  return (
    f.Children.forEach(e, (r, i) => {
      if (!f.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === f.Fragment) {
        n.push.apply(n, Ra(r.props.children, o));
        return;
      }
      X(
        r.type === se,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        X(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes.",
        );
      let s = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (s.children = Ra(r.props.children, o)), n.push(s);
    }),
    n
  );
}
var Zo = "get",
  Yo = "application/x-www-form-urlencoded";
function Zs(e) {
  return e != null && typeof e.tagName == "string";
}
function Zv(e) {
  return Zs(e) && e.tagName.toLowerCase() === "button";
}
function Yv(e) {
  return Zs(e) && e.tagName.toLowerCase() === "form";
}
function Jv(e) {
  return Zs(e) && e.tagName.toLowerCase() === "input";
}
function Xv(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function e0(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Xv(e);
}
var Do = null;
function t0() {
  if (Do === null)
    try {
      new FormData(document.createElement("form"), 0), (Do = !1);
    } catch {
      Do = !0;
    }
  return Do;
}
var n0 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Rl(e) {
  return e != null && !n0.has(e)
    ? (gt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Yo}"`,
      ),
      null)
    : e;
}
function r0(e, t) {
  let n, r, i, o, s;
  if (Yv(e)) {
    let l = e.getAttribute("action");
    (r = l ? Sn(l, t) : null),
      (n = e.getAttribute("method") || Zo),
      (i = Rl(e.getAttribute("enctype")) || Yo),
      (o = new FormData(e));
  } else if (Zv(e) || (Jv(e) && (e.type === "submit" || e.type === "image"))) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let a = e.getAttribute("formaction") || l.getAttribute("action");
    if (
      ((r = a ? Sn(a, t) : null),
      (n = e.getAttribute("formmethod") || l.getAttribute("method") || Zo),
      (i =
        Rl(e.getAttribute("formenctype")) ||
        Rl(l.getAttribute("enctype")) ||
        Yo),
      (o = new FormData(l, e)),
      !t0())
    ) {
      let { name: c, type: d, value: m } = e;
      if (d === "image") {
        let p = c ? `${c}.` : "";
        o.append(`${p}x`, "0"), o.append(`${p}y`, "0");
      } else c && o.append(c, m);
    }
  } else {
    if (Zs(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (n = Zo), (r = null), (i = Yo), (s = e);
  }
  return (
    o && i === "text/plain" && ((s = o), (o = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: o, body: s }
  );
}
function qu(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
async function i0(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return (t[e.id] = n), n;
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function o0(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function s0(e, t, n) {
  let r = await Promise.all(
    e.map(async (i) => {
      let o = t.routes[i.route.id];
      if (o) {
        let s = await i0(o, n);
        return s.links ? s.links() : [];
      }
      return [];
    }),
  );
  return c0(
    r
      .flat(1)
      .filter(o0)
      .filter((i) => i.rel === "stylesheet" || i.rel === "preload")
      .map((i) =>
        i.rel === "stylesheet"
          ? { ...i, rel: "prefetch", as: "style" }
          : { ...i, rel: "prefetch" },
      ),
  );
}
function Id(e, t, n, r, i, o) {
  let s = (a, c) => (n[c] ? a.route.id !== n[c].route.id : !0),
    l = (a, c) => {
      var d;
      return (
        n[c].pathname !== a.pathname ||
        (((d = n[c].route.path) == null ? void 0 : d.endsWith("*")) &&
          n[c].params["*"] !== a.params["*"])
      );
    };
  return o === "assets"
    ? t.filter((a, c) => s(a, c) || l(a, c))
    : o === "data"
      ? t.filter((a, c) => {
          var m;
          let d = r.routes[a.route.id];
          if (!d || !d.hasLoader) return !1;
          if (s(a, c) || l(a, c)) return !0;
          if (a.route.shouldRevalidate) {
            let p = a.route.shouldRevalidate({
              currentUrl: new URL(
                i.pathname + i.search + i.hash,
                window.origin,
              ),
              currentParams: ((m = n[0]) == null ? void 0 : m.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: a.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof p == "boolean") return p;
          }
          return !0;
        })
      : [];
}
function l0(e, t) {
  return a0(
    e
      .map((n) => {
        let r = t.routes[n.route.id];
        if (!r) return [];
        let i = [r.module];
        return r.imports && (i = i.concat(r.imports)), i;
      })
      .flat(1),
  );
}
function a0(e) {
  return [...new Set(e)];
}
function u0(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function c0(e, t) {
  let n = new Set();
  return (
    new Set(t),
    e.reduce((r, i) => {
      let o = JSON.stringify(u0(i));
      return n.has(o) || (n.add(o), r.push({ key: o, link: i })), r;
    }, [])
  );
}
function d0(e) {
  let t =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    t.pathname === "/"
      ? (t.pathname = "_root.data")
      : (t.pathname = `${t.pathname.replace(/\/$/, "")}.data`),
    t
  );
}
function f0() {
  let e = f.useContext(Yr);
  return (
    qu(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function h0() {
  let e = f.useContext(qs);
  return (
    qu(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Zu = f.createContext(void 0);
Zu.displayName = "FrameworkContext";
function Rp() {
  let e = f.useContext(Zu);
  return (
    qu(e, "You must render this element inside a <HydratedRouter> element"), e
  );
}
function p0(e, t) {
  let n = f.useContext(Zu),
    [r, i] = f.useState(!1),
    [o, s] = f.useState(!1),
    {
      onFocus: l,
      onBlur: a,
      onMouseEnter: c,
      onMouseLeave: d,
      onTouchStart: m,
    } = t,
    p = f.useRef(null);
  f.useEffect(() => {
    if ((e === "render" && s(!0), e === "viewport")) {
      let w = (h) => {
          h.forEach((g) => {
            s(g.isIntersecting);
          });
        },
        E = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        p.current && E.observe(p.current),
        () => {
          E.disconnect();
        }
      );
    }
  }, [e]),
    f.useEffect(() => {
      if (r) {
        let w = setTimeout(() => {
          s(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [r]);
  let v = () => {
      i(!0);
    },
    x = () => {
      i(!1), s(!1);
    };
  return n
    ? e !== "intent"
      ? [o, p, {}]
      : [
          o,
          p,
          {
            onFocus: ui(l, v),
            onBlur: ui(a, x),
            onMouseEnter: ui(c, v),
            onMouseLeave: ui(d, x),
            onTouchStart: ui(m, v),
          },
        ]
    : [!1, p, {}];
}
function ui(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function m0({ page: e, ...t }) {
  let { router: n } = f0(),
    r = f.useMemo(() => wp(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r
    ? f.createElement(y0, { page: e, matches: r, ...t })
    : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function g0(e) {
  let { manifest: t, routeModules: n } = Rp(),
    [r, i] = f.useState([]);
  return (
    f.useEffect(() => {
      let o = !1;
      return (
        s0(e, t, n).then((s) => {
          o || i(s);
        }),
        () => {
          o = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function y0({ page: e, matches: t, ...n }) {
  let r = Kt(),
    { manifest: i, routeModules: o } = Rp(),
    { loaderData: s, matches: l } = h0(),
    a = f.useMemo(() => Id(e, t, l, i, r, "data"), [e, t, l, i, r]),
    c = f.useMemo(() => Id(e, t, l, i, r, "assets"), [e, t, l, i, r]),
    d = f.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let v = new Set(),
        x = !1;
      if (
        (t.forEach((E) => {
          var g;
          let h = i.routes[E.route.id];
          !h ||
            !h.hasLoader ||
            ((!a.some((y) => y.route.id === E.route.id) &&
              E.route.id in s &&
              (g = o[E.route.id]) != null &&
              g.shouldRevalidate) ||
            h.hasClientLoader
              ? (x = !0)
              : v.add(E.route.id));
        }),
        v.size === 0)
      )
        return [];
      let w = d0(e);
      return (
        x &&
          v.size > 0 &&
          w.searchParams.set(
            "_routes",
            t
              .filter((E) => v.has(E.route.id))
              .map((E) => E.route.id)
              .join(","),
          ),
        [w.pathname + w.search]
      );
    }, [s, r, i, a, t, e, o]),
    m = f.useMemo(() => l0(c, i), [c, i]),
    p = g0(c);
  return f.createElement(
    f.Fragment,
    null,
    d.map((v) =>
      f.createElement("link", {
        key: v,
        rel: "prefetch",
        as: "fetch",
        href: v,
        ...n,
      }),
    ),
    m.map((v) =>
      f.createElement("link", { key: v, rel: "modulepreload", href: v, ...n }),
    ),
    p.map(({ key: v, link: x }) => f.createElement("link", { key: v, ...x })),
  );
}
function v0(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var Ip =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Ip && (window.__reactRouterVersion = "7.0.2");
} catch {}
function x0({ basename: e, children: t, window: n }) {
  let r = f.useRef();
  r.current == null && (r.current = ov({ window: n, v5Compat: !0 }));
  let i = r.current,
    [o, s] = f.useState({ action: i.action, location: i.location }),
    l = f.useCallback(
      (a) => {
        f.startTransition(() => s(a));
      },
      [s],
    );
  return (
    f.useLayoutEffect(() => i.listen(l), [i, l]),
    f.createElement(Gv, {
      basename: e,
      children: t,
      location: o.location,
      navigationType: o.action,
      navigator: i,
    })
  );
}
var Dp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ct = f.forwardRef(function (
    {
      onClick: t,
      discover: n = "render",
      prefetch: r = "none",
      relative: i,
      reloadDocument: o,
      replace: s,
      state: l,
      target: a,
      to: c,
      preventScrollReset: d,
      viewTransition: m,
      ...p
    },
    v,
  ) {
    let { basename: x } = f.useContext(vt),
      w = typeof c == "string" && Dp.test(c),
      E,
      h = !1;
    if (typeof c == "string" && w && ((E = c), Ip))
      try {
        let L = new URL(window.location.href),
          R = c.startsWith("//") ? new URL(L.protocol + c) : new URL(c),
          Q = Sn(R.pathname, x);
        R.origin === L.origin && Q != null
          ? (c = Q + R.search + R.hash)
          : (h = !0);
      } catch {
        gt(
          !1,
          `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let g = Rv(c, { relative: i }),
      [y, S, N] = p0(r, p),
      j = S0(c, {
        replace: s,
        state: l,
        target: a,
        preventScrollReset: d,
        relative: i,
        viewTransition: m,
      });
    function T(L) {
      t && t(L), L.defaultPrevented || j(L);
    }
    let O = f.createElement("a", {
      ...p,
      ...N,
      href: E || g,
      onClick: h || o ? t : T,
      ref: v0(v, S),
      target: a,
      "data-discover": !w && n === "render" ? "true" : void 0,
    });
    return y && !w
      ? f.createElement(f.Fragment, null, O, f.createElement(m0, { page: g }))
      : O;
  });
Ct.displayName = "Link";
var Ap = f.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: r = "",
    end: i = !1,
    style: o,
    to: s,
    viewTransition: l,
    children: a,
    ...c
  },
  d,
) {
  let m = so(s, { relative: c.relative }),
    p = Kt(),
    v = f.useContext(qs),
    { navigator: x, basename: w } = f.useContext(vt),
    E = v != null && T0(m) && l === !0,
    h = x.encodeLocation ? x.encodeLocation(m).pathname : m.pathname,
    g = p.pathname,
    y =
      v && v.navigation && v.navigation.location
        ? v.navigation.location.pathname
        : null;
  n ||
    ((g = g.toLowerCase()),
    (y = y ? y.toLowerCase() : null),
    (h = h.toLowerCase())),
    y && w && (y = Sn(y, w) || y);
  const S = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
  let N = g === h || (!i && g.startsWith(h) && g.charAt(S) === "/"),
    j =
      y != null &&
      (y === h || (!i && y.startsWith(h) && y.charAt(h.length) === "/")),
    T = { isActive: N, isPending: j, isTransitioning: E },
    O = N ? t : void 0,
    L;
  typeof r == "function"
    ? (L = r(T))
    : (L = [
        r,
        N ? "active" : null,
        j ? "pending" : null,
        E ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let R = typeof o == "function" ? o(T) : o;
  return f.createElement(
    Ct,
    {
      ...c,
      "aria-current": O,
      className: L,
      ref: d,
      style: R,
      to: s,
      viewTransition: l,
    },
    typeof a == "function" ? a(T) : a,
  );
});
Ap.displayName = "NavLink";
var w0 = f.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: i,
      state: o,
      method: s = Zo,
      action: l,
      onSubmit: a,
      relative: c,
      preventScrollReset: d,
      viewTransition: m,
      ...p
    },
    v,
  ) => {
    let x = k0(),
      w = j0(l, { relative: c }),
      E = s.toLowerCase() === "get" ? "get" : "post",
      h = typeof l == "string" && Dp.test(l),
      g = (y) => {
        if ((a && a(y), y.defaultPrevented)) return;
        y.preventDefault();
        let S = y.nativeEvent.submitter,
          N = (S == null ? void 0 : S.getAttribute("formmethod")) || s;
        x(S || y.currentTarget, {
          fetcherKey: t,
          method: N,
          navigate: n,
          replace: i,
          state: o,
          relative: c,
          preventScrollReset: d,
          viewTransition: m,
        });
      };
    return f.createElement("form", {
      ref: v,
      method: E,
      action: w,
      onSubmit: r ? a : g,
      ...p,
      "data-discover": !h && e === "render" ? "true" : void 0,
    });
  },
);
w0.displayName = "Form";
function C0(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function _p(e) {
  let t = f.useContext(Yr);
  return X(t, C0(e)), t;
}
function S0(
  e,
  {
    target: t,
    replace: n,
    state: r,
    preventScrollReset: i,
    relative: o,
    viewTransition: s,
  } = {},
) {
  let l = ze(),
    a = Kt(),
    c = so(e, { relative: o });
  return f.useCallback(
    (d) => {
      if (e0(d, t)) {
        d.preventDefault();
        let m = n !== void 0 ? n : Vi(a) === Vi(c);
        l(e, {
          replace: m,
          state: r,
          preventScrollReset: i,
          relative: o,
          viewTransition: s,
        });
      }
    },
    [a, l, c, n, r, t, e, i, o, s],
  );
}
var E0 = 0,
  N0 = () => `__${String(++E0)}__`;
function k0() {
  let { router: e } = _p("useSubmit"),
    { basename: t } = f.useContext(vt),
    n = Vv();
  return f.useCallback(
    async (r, i = {}) => {
      let { action: o, method: s, encType: l, formData: a, body: c } = r0(r, t);
      if (i.navigate === !1) {
        let d = i.fetcherKey || N0();
        await e.fetch(d, n, i.action || o, {
          preventScrollReset: i.preventScrollReset,
          formData: a,
          body: c,
          formMethod: i.method || s,
          formEncType: i.encType || l,
          flushSync: i.flushSync,
        });
      } else
        await e.navigate(i.action || o, {
          preventScrollReset: i.preventScrollReset,
          formData: a,
          body: c,
          formMethod: i.method || s,
          formEncType: i.encType || l,
          replace: i.replace,
          state: i.state,
          fromRouteId: n,
          flushSync: i.flushSync,
          viewTransition: i.viewTransition,
        });
    },
    [e, t, n],
  );
}
function j0(e, { relative: t } = {}) {
  let { basename: n } = f.useContext(vt),
    r = f.useContext(rt);
  X(r, "useFormAction must be used inside a RouteContext");
  let [i] = r.matches.slice(-1),
    o = { ...so(e || ".", { relative: t }) },
    s = Kt();
  if (e == null) {
    o.search = s.search;
    let l = new URLSearchParams(o.search),
      a = l.getAll("index");
    if (a.some((d) => d === "")) {
      l.delete("index"),
        a.filter((m) => m).forEach((m) => l.append("index", m));
      let d = l.toString();
      o.search = d ? `?${d}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      i.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    n !== "/" && (o.pathname = o.pathname === "/" ? n : zt([n, o.pathname])),
    Vi(o)
  );
}
function T0(e, t = {}) {
  let n = f.useContext(Np);
  X(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = _p("useViewTransitionState"),
    i = so(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let o = Sn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    s = Sn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Es(i.pathname, s) != null || Es(i.pathname, o) != null;
}
new TextEncoder();
const pi = "/dashboard",
  Ia = "/auth",
  B = {
    HOME: "/",
    LOCATIONS: `${pi}/locations`,
    PRODUCTIONS: `${pi}/productions`,
    CONTACTS: `${pi}/contacts`,
    CALENDAR: `${pi}/calendar`,
    ABOUT: "/about",
    PROFILE: "/profile",
    PRICING: "/pricing",
    LOGIN: `${Ia}/login`,
    REGISTER: `${Ia}/register`,
  },
  ae = {
    LOCATIONS: B.LOCATIONS,
    ADD_LOCATION: `${B.LOCATIONS}/add`,
    EDIT_LOCATION: `${B.LOCATIONS}/edit`,
    CONTACTS: B.CONTACTS,
    ADD_CONTACT: `${B.CONTACTS}/add`,
    EDIT_CONTACT: `${B.CONTACTS}/edit`,
    PRODUCTIONS: B.PRODUCTIONS,
    ADD_PRODUCTION: `${B.PRODUCTIONS}/add`,
    EDIT_PRODUCTION: `${B.PRODUCTIONS}/edit`,
  };
function yt({ children: e = u.jsx(u.Fragment, {}), className: t = "" }) {
  return u.jsx("div", {
    className: `bg-white p-3 rounded-xl shadow-md ${t}`,
    children: e,
  });
}
function $t({ children: e = u.jsx(u.Fragment, {}), className: t = "" }) {
  return u.jsx("div", {
    className: `flex flex-row items-center space-x-2 ${t}`,
    children: e,
  });
}
function Je({ children: e = u.jsx(u.Fragment, {}), className: t = "" }) {
  return u.jsx("div", {
    className: `flex flex-column justify-center space-y-2 ${t}`,
    children: e,
  });
}
function Il({ children: e, className: t = "" }) {
  return u.jsx(Je, {
    className: `m-0 min-h-screen w-screen ${t}`,
    children: e,
  });
}
function Ns({ children: e, className: t = "", onClick: n = () => {} }) {
  return u.jsx(u.Fragment, {
    children: u.jsx("button", {
      className: `bg-primary-500 rounded-md px-3 py-2 text-sm ${t}`,
      onClick: n,
      children: e,
    }),
  });
}
function O0() {
  return u.jsxs(Je, {
    className: "overflow-x-hidden",
    children: [
      u.jsx(Je, {
        className:
          "h-screen w-screen bg-[url(/src/assets/img/wave1.svg)] bg-no-repeat bg-cover bg-bottom items-center",
        children: u.jsxs(Je, {
          className:
            "*:drop-shadow-xl w-1/4 justify-center items-center text-center",
          children: [
            u.jsx("h1", {
              className: "text-7xl text-indigo-950 font-extrabold",
              children: "LocusPoint",
            }),
            u.jsx("p", {
              className: "text-2xl text-slate-600",
              children:
                "designed to streamline the organization and management of filming locations.",
            }),
            u.jsx(Ns, {
              children: u.jsx(Ct, { to: B.LOCATIONS, children: "Get Started" }),
            }),
          ],
        }),
      }),
      u.jsx(Il, {
        className: "relative bg-indigo-500 m-0",
        children: u.jsxs($t, {
          className: "m-12 mb-0 h-[320px] z-10 items-end",
          children: [
            u.jsx(Dl, {
              src: "/src/assets/img/landing/icon-contacts.svg",
              title: "Collaboration",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus.",
            }),
            u.jsx(Dl, {
              src: "/src/assets/img/landing/icon-images.svg",
              title: "Locations",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus.",
            }),
            u.jsx(Dl, {
              src: "/src/assets/img/landing/icon-contacts.svg",
              title: "Whatever",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus.",
            }),
          ],
        }),
      }),
      u.jsxs(Il, {
        className: "relative items-start",
        children: [
          u.jsx("span", {
            className:
              "absolute top-0 h-[400px] z-0 w-full m-0 bg-[url(/src/assets/img/wave2.svg)] bg-no-repeat bg-cover bg-bottom",
          }),
          u.jsxs(Je, {
            className: "pt-[128px] z-10 w-full justify-center items-center",
            children: [
              u.jsx("img", {
                className: "w-[800px] h-[400px] object-cover rounded-lg",
                src: "/src/assets/img/auth.webp",
              }),
              u.jsxs(Je, {
                className:
                  "z-10 px-64 text-center w-full justify-center items-center",
                children: [
                  u.jsx("h1", {
                    className:
                      "text-slate-900 font-bold text-6xl mt-[48px] mb-[24px]",
                    children: "About us",
                  }),
                  u.jsxs("p", {
                    children: [
                      " ",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus. Integer ac volutpat ipsum, eu pulvinar lacus. Pellentesque at felis quis felis eleifend fringilla eget vitae dolor. Ut efficitur interdum ex, quis pretium lectus rutrum vel. Donec volutpat fermentum dolor, id tristique ante commodo sed. Cras interdum neque mi, quis molestie neque cursus vel. Aenean auctor, est in cursus posuere, magna lorem imperdiet sem, vitae tincidunt arcu leo sit amet est. Proin odio elit, interdum quis ipsum id, fringilla pulvinar felis.",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      u.jsx(Il, { children: "Plz buy our app. Thank" }),
    ],
  });
}
function Dl({ src: e, title: t, desc: n }) {
  return u.jsxs(Je, {
    className:
      "*:drop-shadow-xl w-[480px] text-center flex-grow-0 items-center",
    children: [
      u.jsx("span", {
        className: `bg-[url(${e})] h-[80px] w-[80px] bg-contain`,
      }),
      u.jsx("h3", {
        className: "text-amber-300 text-5xl font-bold",
        children: t,
      }),
      u.jsx("p", { className: "text-amber-100 text-2xl", children: n }),
    ],
  });
}
var Dd = {},
  Qi = function () {
    return (
      (Qi =
        Object.assign ||
        function (t) {
          for (var n, r = 1, i = arguments.length; r < i; r++) {
            n = arguments[r];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
          return t;
        }),
      Qi.apply(this, arguments)
    );
  };
function bp(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function Mp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Fp = { exports: {} },
  Al,
  Ad;
function P0() {
  if (Ad) return Al;
  Ad = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (Al = e), Al;
}
var _l, _d;
function L0() {
  if (_d) return _l;
  _d = 1;
  var e = P0();
  function t() {}
  function n() {}
  return (
    (n.resetWarningCache = t),
    (_l = function () {
      function r(s, l, a, c, d, m) {
        if (m !== e) {
          var p = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((p.name = "Invariant Violation"), p);
        }
      }
      r.isRequired = r;
      function i() {
        return r;
      }
      var o = {
        array: r,
        bigint: r,
        bool: r,
        func: r,
        number: r,
        object: r,
        string: r,
        symbol: r,
        any: r,
        arrayOf: i,
        element: r,
        elementType: r,
        instanceOf: i,
        node: r,
        objectOf: i,
        oneOf: i,
        oneOfType: i,
        shape: i,
        exact: i,
        checkPropTypes: n,
        resetWarningCache: t,
      };
      return (o.PropTypes = o), o;
    }),
    _l
  );
}
Fp.exports = L0()();
var R0 = Fp.exports,
  le = Mp(R0),
  zp = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var o = "", s = 0; s < arguments.length; s++) {
        var l = arguments[s];
        l && (o = i(o, r(l)));
      }
      return o;
    }
    function r(o) {
      if (typeof o == "string" || typeof o == "number") return o;
      if (typeof o != "object") return "";
      if (Array.isArray(o)) return n.apply(null, o);
      if (
        o.toString !== Object.prototype.toString &&
        !o.toString.toString().includes("[native code]")
      )
        return o.toString();
      var s = "";
      for (var l in o) t.call(o, l) && o[l] && (s = i(s, l));
      return s;
    }
    function i(o, s) {
      return s ? (o ? o + " " + s : o + s) : o;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(zp);
var I0 = zp.exports,
  ks = Mp(I0),
  D0 = function (e) {
    return e
      .replace(/([-_][a-z0-9])/gi, function (t) {
        return t.toUpperCase();
      })
      .replace(/-/gi, "");
  },
  Qt = f.forwardRef(function (e, t) {
    var n,
      r = e.className,
      i = e.content,
      o = e.customClassName,
      s = e.height,
      l = e.icon,
      a = e.name,
      c = e.size,
      d = e.title,
      m = e.use,
      p = e.width,
      v = bp(e, [
        "className",
        "content",
        "customClassName",
        "height",
        "icon",
        "name",
        "size",
        "title",
        "use",
        "width",
      ]),
      x = f.useState(0),
      w = x[0],
      E = x[1],
      h = l || i || a;
    i && process,
      a && process,
      f.useMemo(
        function () {
          return E(w + 1);
        },
        [h, JSON.stringify(h)],
      );
    var g = d ? "<title>".concat(d, "</title>") : "",
      y = f.useMemo(
        function () {
          var O = h && typeof h == "string" && h.includes("-") ? D0(h) : h;
          if (Array.isArray(h)) return h;
          if (typeof h == "string" && A.icons) return A[O];
        },
        [w],
      ),
      S = f.useMemo(
        function () {
          return Array.isArray(y) ? y[1] || y[0] : y;
        },
        [w],
      ),
      N = (function () {
        return Array.isArray(y) && y.length > 1 ? y[0] : "64 64";
      })(),
      j = (function () {
        return v.viewBox || "0 0 ".concat(N);
      })(),
      T = o
        ? ks(o)
        : ks(
            "icon",
            ((n = {}),
            (n["icon-".concat(c)] = c),
            (n["icon-custom-size"] = s || p),
            n),
            r,
          );
    return A.createElement(
      A.Fragment,
      null,
      m
        ? A.createElement(
            "svg",
            Qi(
              { xmlns: "http://www.w3.org/2000/svg", className: T },
              s && { height: s },
              p && { width: p },
              { role: "img", "aria-hidden": "true" },
              v,
              { ref: t },
            ),
            A.createElement("use", { href: m }),
          )
        : A.createElement(
            "svg",
            Qi(
              { xmlns: "http://www.w3.org/2000/svg", viewBox: j, className: T },
              s && { height: s },
              p && { width: p },
              {
                role: "img",
                "aria-hidden": "true",
                dangerouslySetInnerHTML: { __html: g + S },
              },
              v,
              { ref: t },
            ),
          ),
      d && A.createElement("span", { className: "visually-hidden" }, d),
    );
  });
Qt.propTypes = {
  className: le.string,
  content: le.oneOfType([le.array, le.string]),
  customClassName: le.string,
  height: le.number,
  icon: le.oneOfType([le.array, le.string]),
  name: le.string,
  size: le.oneOf([
    "custom",
    "custom-size",
    "sm",
    "lg",
    "xl",
    "xxl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ]),
  title: le.string,
  use: le.string,
  viewBox: le.string,
  width: le.number,
};
Qt.displayName = "CIcon";
var $p = f.forwardRef(function (e, t) {
  var n,
    r = e.children,
    i = e.className,
    o = e.customClassName,
    s = e.height,
    l = e.size,
    a = e.title,
    c = e.width,
    d = bp(e, [
      "children",
      "className",
      "customClassName",
      "height",
      "size",
      "title",
      "width",
    ]),
    m = o
      ? ks(o)
      : ks(
          "icon",
          ((n = {}),
          (n["icon-".concat(l)] = l),
          (n["icon-custom-size"] = s || c),
          n),
          i,
        );
  return A.createElement(
    A.Fragment,
    null,
    f.Children.map(r, function (p) {
      if (A.isValidElement(p))
        return A.cloneElement(
          p,
          Qi(
            {
              "aria-hidden": !0,
              className: m,
              focusable: "false",
              ref: t,
              role: "img",
            },
            d,
          ),
        );
    }),
    a && A.createElement("span", { className: "visually-hidden" }, a),
  );
});
$p.propTypes = {
  className: le.string,
  customClassName: le.string,
  height: le.number,
  size: le.oneOf([
    "custom",
    "custom-size",
    "sm",
    "lg",
    "xl",
    "xxl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ]),
  title: le.string,
  width: le.number,
};
$p.displayName = "CIconSvg";
var A0 = [
    "512 512",
    "<path fill='var(--ci-primary-color, currentColor)' d='M472,96H384V40H352V96H160V40H128V96H40a24.028,24.028,0,0,0-24,24V456a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V120A24.028,24.028,0,0,0,472,96Zm-8,352H48V128h80v40h32V128H352v40h32V128h80Z' class='ci-primary'/><rect width='32' height='32' x='112' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='200' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='280' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='368' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='112' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='200' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='280' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='368' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='112' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='200' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='280' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='368' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/>",
  ],
  _0 = [
    "512 512",
    "<path fill='var(--ci-primary-color, currentColor)' d='M471.993,112h-89.2L366.551,65.25a32.023,32.023,0,0,0-30.229-21.5H175.241a31.991,31.991,0,0,0-30.294,21.691L129.1,112h-89.1a24.027,24.027,0,0,0-24,24V448a24.027,24.027,0,0,0,24,24H471.993a24.027,24.027,0,0,0,24-24V136A24.027,24.027,0,0,0,471.993,112Zm-8,328H48.007V144h104.01l23.224-68.25H336.322L360.032,144H463.993Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M256,168A114,114,0,1,0,370,282,114.13,114.13,0,0,0,256,168Zm0,196a82,82,0,1,1,82-82A82.093,82.093,0,0,1,256,364Z' class='ci-primary'/>",
  ],
  b0 = [
    "512 512",
    "<path fill='var(--ci-primary-color, currentColor)' d='M472,48H40A24.028,24.028,0,0,0,16,72V440a24.028,24.028,0,0,0,24,24h88V405.178A20.01,20.01,0,0,1,138.284,387.7l91.979-51.123L200,260.919V200a56,56,0,0,1,112,0v60.919l-30.263,75.655L373.716,387.7h0A20.011,20.011,0,0,1,384,405.178V464h88a24.028,24.028,0,0,0,24-24V72A24.028,24.028,0,0,0,472,48Zm-8,384H416V405.178a52.027,52.027,0,0,0-26.738-45.451h0L321.915,322.3,344,267.081V200a88,88,0,0,0-176,0v67.081L190.085,322.3l-67.347,37.432A52.027,52.027,0,0,0,96,405.178V432H48V80H464Z' class='ci-primary'/>",
  ],
  M0 = [
    "512 512",
    "<path fill='var(--ci-primary-color, currentColor)' d='M47.547,63.547V448.453a16,16,0,0,0,16,16H448.453a16,16,0,0,0,16-16V63.547a16,16,0,0,0-16-16H63.547A16,16,0,0,0,47.547,63.547Zm288.6,16h96.3v96.3h-96.3Zm0,128.3h96.3v96.3h-96.3Zm0,128.3h96.3v96.3h-96.3Zm-128.3-256.6h96.3v96.3h-96.3Zm0,128.3h96.3v96.3h-96.3Zm0,128.3h96.3v96.3h-96.3Zm-128.3-256.6h96.3v96.3h-96.3Zm0,128.3h96.3v96.3h-96.3Zm0,128.3h96.3v96.3h-96.3Z' class='ci-primary'/>",
  ],
  F0 = [
    "512 512",
    "<rect width='264' height='32' x='208' y='80' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M40,96a64,64,0,1,0,64-64A64.072,64.072,0,0,0,40,96Zm64-32A32,32,0,1,1,72,96,32.036,32.036,0,0,1,104,64Z' class='ci-primary'/><rect width='264' height='32' x='208' y='240' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M104,320a64,64,0,1,0-64-64A64.072,64.072,0,0,0,104,320Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,104,224Z' class='ci-primary'/><rect width='264' height='32' x='208' y='400' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M104,480a64,64,0,1,0-64-64A64.072,64.072,0,0,0,104,480Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,104,384Z' class='ci-primary'/>",
  ],
  z0 = [
    "512 512",
    "<path fill='var(--ci-primary-color, currentColor)' d='M253.924,127.592a64,64,0,1,0,64,64A64.073,64.073,0,0,0,253.924,127.592Zm0,96a32,32,0,1,1,32-32A32.037,32.037,0,0,1,253.924,223.592Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M376.906,68.515A173.922,173.922,0,0,0,108.2,286.426L229.107,472.039a29.619,29.619,0,0,0,49.635,0L399.653,286.426A173.921,173.921,0,0,0,376.906,68.515Zm-4.065,200.444L253.925,451.509,135.008,268.959C98.608,213.08,106.415,138.3,153.571,91.142a141.92,141.92,0,0,1,200.708,0C401.435,138.3,409.241,213.08,372.841,268.959Z' class='ci-primary'/>",
  ],
  $0 = [
    "512 512",
    "<path fill='var(--ci-primary-color, currentColor)' d='M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z' class='ci-primary'/>",
  ],
  Up = [
    "512 512",
    "<polygon fill='var(--ci-primary-color, currentColor)' points='348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z' class='ci-primary'/>",
  ];
function Bp({
  data: e,
  columnNames: t,
  actions: n = {},
  onRowClick: r = () => {},
}) {
  const [i] = f.useState(Object.keys(t)),
    [o, s] = f.useState(!1);
  return (
    f.useEffect(() => {
      s(n !== void 0 && Object.keys(n).length > 0);
    }, [n]),
    u.jsx(u.Fragment, {
      children: u.jsx(yt, {
        className: "p-2 w-screen-xl",
        children: u.jsxs("table", {
          className: "w-full",
          children: [
            u.jsx("thead", {
              children: u.jsxs("tr", {
                children: [
                  i.map((l, a) =>
                    u.jsx(
                      "th",
                      {
                        className:
                          "bg-gray-50 p-3 first:rounded-l-lg last:rounded-r-lg",
                        children: t[l],
                      },
                      a,
                    ),
                  ),
                  o
                    ? u.jsx("th", {
                        className: "bg-gray-50 p-3 last:rounded-r-lg",
                      })
                    : null,
                ],
              }),
            }),
            u.jsx("tbody", {
              className: "divide-y divide-slate-100",
              children: e.map((l, a) =>
                u.jsxs(
                  "tr",
                  {
                    className: "hover:bg-gray-100 transition-colors",
                    onClick: (c) => {
                      c.target.closest(".actions-menu") || r(a);
                    },
                    children: [
                      i.map((c, d) =>
                        u.jsx("td", { className: "p-3", children: l[c] }, d),
                      ),
                      o
                        ? u.jsx("td", {
                            className: "relative",
                            children: u.jsx(Hp, { actions: n, itemIndex: a }),
                          })
                        : null,
                    ],
                  },
                  a,
                ),
              ),
            }),
          ],
        }),
      }),
    })
  );
}
function Hp({ children: e, actions: t, itemIndex: n }) {
  const [r, i] = f.useState(!1),
    o = (a) => {
      a.stopPropagation(), i((c) => !c);
    },
    s = (a) => {
      a.currentTarget.contains(a.relatedTarget) || i(!1);
    },
    l = (a, c) => {
      a.stopPropagation(), t[c](n), i(!1);
    };
  return u.jsxs("div", {
    className: "actions-menu relative inline-block",
    onBlur: s,
    tabIndex: 0,
    children: [
      u.jsx("button", {
        onClick: o,
        className: "p-1 rounded hover:bg-gray-100 focus:outline-none",
        children: e || u.jsx(Qt, { icon: $0 }),
      }),
      u.jsx(yt, {
        className: `absolute top-full right-0 z-50 mt-2 min-w-[8rem] bg-white shadow-lg rounded-md p-1 flex flex-col ${r ? "" : "hidden"}`,
        children: Object.keys(t)
          .sort()
          .map((a, c) =>
            u.jsx(
              "button",
              {
                onClick: (d) => l(d, a),
                className: "px-3 py-1 text-left hover:bg-gray-100 rounded",
                children: a,
              },
              c,
            ),
          ),
      }),
    ],
  });
}
var re = function () {
  return (
    (re =
      Object.assign ||
      function (t) {
        for (var n, r = 1, i = arguments.length; r < i; r++) {
          n = arguments[r];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }),
    re.apply(this, arguments)
  );
};
function fe(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
var Vp = { exports: {} },
  U0 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  B0 = U0,
  H0 = B0;
function Qp() {}
function Wp() {}
Wp.resetWarningCache = Qp;
var V0 = function () {
  function e(r, i, o, s, l, a) {
    if (a !== H0) {
      var c = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
      );
      throw ((c.name = "Invariant Violation"), c);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Wp,
    resetWarningCache: Qp,
  };
  return (n.PropTypes = n), n;
};
Vp.exports = V0();
var Q0 = Vp.exports;
const k = Rs(Q0);
function W0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Kp = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var o = "", s = 0; s < arguments.length; s++) {
        var l = arguments[s];
        l && (o = i(o, r(l)));
      }
      return o;
    }
    function r(o) {
      if (typeof o == "string" || typeof o == "number") return o;
      if (typeof o != "object") return "";
      if (Array.isArray(o)) return n.apply(null, o);
      if (
        o.toString !== Object.prototype.toString &&
        !o.toString.toString().includes("[native code]")
      )
        return o.toString();
      var s = "";
      for (var l in o) t.call(o, l) && o[l] && (s = i(s, l));
      return s;
    }
    function i(o, s) {
      return s ? (o ? o + " " + s : o + s) : o;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(Kp);
var K0 = Kp.exports,
  ce = W0(K0);
function Yu() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return f.useMemo(function () {
    return e.every(function (n) {
      return n == null;
    })
      ? null
      : function (n) {
          e.forEach(function (r) {
            G0(r, n);
          });
        };
  }, e);
}
function G0(e, t) {
  if (e != null)
    if (q0(e)) e(t);
    else
      try {
        e.current = t;
      } catch {
        throw new Error(
          'Cannot assign value "'.concat(t, '" to ref "').concat(e, '"'),
        );
      }
}
function q0(e) {
  return !!(e && {}.toString.call(e) == "[object Function]");
}
function Z0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Da(e, t) {
  return (
    (Da = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Da(e, t)
  );
}
function Y0(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Da(e, t);
}
var bd = { disabled: !1 },
  Gp = A.createContext(null),
  J0 = function (t) {
    return t.scrollTop;
  },
  mi = "unmounted",
  Rn = "exited",
  In = "entering",
  or = "entered",
  Aa = "exiting",
  Rt = (function (e) {
    Y0(t, e);
    function t(r, i) {
      var o;
      o = e.call(this, r, i) || this;
      var s = i,
        l = s && !s.isMounting ? r.enter : r.appear,
        a;
      return (
        (o.appearStatus = null),
        r.in
          ? l
            ? ((a = Rn), (o.appearStatus = In))
            : (a = or)
          : r.unmountOnExit || r.mountOnEnter
            ? (a = mi)
            : (a = Rn),
        (o.state = { status: a }),
        (o.nextCallback = null),
        o
      );
    }
    t.getDerivedStateFromProps = function (i, o) {
      var s = i.in;
      return s && o.status === mi ? { status: Rn } : null;
    };
    var n = t.prototype;
    return (
      (n.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (n.componentDidUpdate = function (i) {
        var o = null;
        if (i !== this.props) {
          var s = this.state.status;
          this.props.in
            ? s !== In && s !== or && (o = In)
            : (s === In || s === or) && (o = Aa);
        }
        this.updateStatus(!1, o);
      }),
      (n.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (n.getTimeouts = function () {
        var i = this.props.timeout,
          o,
          s,
          l;
        return (
          (o = s = l = i),
          i != null &&
            typeof i != "number" &&
            ((o = i.exit),
            (s = i.enter),
            (l = i.appear !== void 0 ? i.appear : s)),
          { exit: o, enter: s, appear: l }
        );
      }),
      (n.updateStatus = function (i, o) {
        if ((i === void 0 && (i = !1), o !== null))
          if ((this.cancelNextCallback(), o === In)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef
                ? this.props.nodeRef.current
                : Io.findDOMNode(this);
              s && J0(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === Rn &&
            this.setState({ status: mi });
      }),
      (n.performEnter = function (i) {
        var o = this,
          s = this.props.enter,
          l = this.context ? this.context.isMounting : i,
          a = this.props.nodeRef ? [l] : [Io.findDOMNode(this), l],
          c = a[0],
          d = a[1],
          m = this.getTimeouts(),
          p = l ? m.appear : m.enter;
        if ((!i && !s) || bd.disabled) {
          this.safeSetState({ status: or }, function () {
            o.props.onEntered(c);
          });
          return;
        }
        this.props.onEnter(c, d),
          this.safeSetState({ status: In }, function () {
            o.props.onEntering(c, d),
              o.onTransitionEnd(p, function () {
                o.safeSetState({ status: or }, function () {
                  o.props.onEntered(c, d);
                });
              });
          });
      }),
      (n.performExit = function () {
        var i = this,
          o = this.props.exit,
          s = this.getTimeouts(),
          l = this.props.nodeRef ? void 0 : Io.findDOMNode(this);
        if (!o || bd.disabled) {
          this.safeSetState({ status: Rn }, function () {
            i.props.onExited(l);
          });
          return;
        }
        this.props.onExit(l),
          this.safeSetState({ status: Aa }, function () {
            i.props.onExiting(l),
              i.onTransitionEnd(s.exit, function () {
                i.safeSetState({ status: Rn }, function () {
                  i.props.onExited(l);
                });
              });
          });
      }),
      (n.cancelNextCallback = function () {
        this.nextCallback !== null &&
          (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (n.safeSetState = function (i, o) {
        (o = this.setNextCallback(o)), this.setState(i, o);
      }),
      (n.setNextCallback = function (i) {
        var o = this,
          s = !0;
        return (
          (this.nextCallback = function (l) {
            s && ((s = !1), (o.nextCallback = null), i(l));
          }),
          (this.nextCallback.cancel = function () {
            s = !1;
          }),
          this.nextCallback
        );
      }),
      (n.onTransitionEnd = function (i, o) {
        this.setNextCallback(o);
        var s = this.props.nodeRef
            ? this.props.nodeRef.current
            : Io.findDOMNode(this),
          l = i == null && !this.props.addEndListener;
        if (!s || l) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          var a = this.props.nodeRef
              ? [this.nextCallback]
              : [s, this.nextCallback],
            c = a[0],
            d = a[1];
          this.props.addEndListener(c, d);
        }
        i != null && setTimeout(this.nextCallback, i);
      }),
      (n.render = function () {
        var i = this.state.status;
        if (i === mi) return null;
        var o = this.props,
          s = o.children;
        o.in,
          o.mountOnEnter,
          o.unmountOnExit,
          o.appear,
          o.enter,
          o.exit,
          o.timeout,
          o.addEndListener,
          o.onEnter,
          o.onEntering,
          o.onEntered,
          o.onExit,
          o.onExiting,
          o.onExited,
          o.nodeRef;
        var l = Z0(o, [
          "children",
          "in",
          "mountOnEnter",
          "unmountOnExit",
          "appear",
          "enter",
          "exit",
          "timeout",
          "addEndListener",
          "onEnter",
          "onEntering",
          "onEntered",
          "onExit",
          "onExiting",
          "onExited",
          "nodeRef",
        ]);
        return A.createElement(
          Gp.Provider,
          { value: null },
          typeof s == "function"
            ? s(i, l)
            : A.cloneElement(A.Children.only(s), l),
        );
      }),
      t
    );
  })(A.Component);
Rt.contextType = Gp;
Rt.propTypes = {};
function nr() {}
Rt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: nr,
  onEntering: nr,
  onEntered: nr,
  onExit: nr,
  onExiting: nr,
  onExited: nr,
};
Rt.UNMOUNTED = mi;
Rt.EXITED = Rn;
Rt.ENTERING = In;
Rt.ENTERED = or;
Rt.EXITING = Aa;
var Ju = f.forwardRef(function (e, t) {
  var n = e.className,
    r = e.dark,
    i = e.disabled,
    o = e.white,
    s = fe(e, ["className", "dark", "disabled", "white"]);
  return A.createElement(
    "button",
    re(
      {
        type: "button",
        className: ce("btn", "btn-close", { "btn-close-white": o }, i, n),
        "aria-label": "Close",
        disabled: i,
      },
      r && { "data-coreui-theme": "dark" },
      s,
      { ref: t },
    ),
  );
});
Ju.propTypes = {
  className: k.string,
  dark: k.bool,
  disabled: k.bool,
  white: k.bool,
};
Ju.displayName = "CCloseButton";
var Qr = k.oneOfType([
  k.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
  ]),
  k.string,
]);
k.oneOfType([
  k.arrayOf(k.oneOf(["top", "bottom", "right", "left"]).isRequired),
  k.oneOf(["top", "bottom", "right", "left"]),
]);
k.oneOf([
  "auto",
  "auto-start",
  "auto-end",
  "top-end",
  "top",
  "top-start",
  "bottom-end",
  "bottom",
  "bottom-start",
  "right-start",
  "right",
  "right-end",
  "left-start",
  "left",
  "left-end",
]);
k.oneOfType([
  k.oneOf([
    "rounded",
    "rounded-top",
    "rounded-end",
    "rounded-bottom",
    "rounded-start",
    "rounded-circle",
    "rounded-pill",
    "rounded-0",
    "rounded-1",
    "rounded-2",
    "rounded-3",
  ]),
  k.string,
]);
k.oneOfType([Qr, k.oneOf(["white", "muted"]), k.string]);
k.oneOfType([
  k.arrayOf(k.oneOf(["hover", "focus", "click"]).isRequired),
  k.oneOf(["hover", "focus", "click"]),
]);
var ji = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.className,
    i = e.color,
    o = i === void 0 ? "primary" : i,
    s = e.dismissible,
    l = e.variant,
    a = e.visible,
    c = a === void 0 ? !0 : a,
    d = e.onClose,
    m = fe(e, [
      "children",
      "className",
      "color",
      "dismissible",
      "variant",
      "visible",
      "onClose",
    ]),
    p = f.useRef(null),
    v = Yu(t, p),
    x = f.useState(c),
    w = x[0],
    E = x[1];
  return (
    f.useEffect(
      function () {
        E(c);
      },
      [c],
    ),
    A.createElement(
      Rt,
      {
        in: w,
        mountOnEnter: !0,
        nodeRef: p,
        onExit: d,
        timeout: 150,
        unmountOnExit: !0,
      },
      function (h) {
        return A.createElement(
          "div",
          re(
            {
              className: ce(
                "alert",
                l === "solid"
                  ? "bg-".concat(o, " text-white")
                  : "alert-".concat(o),
                { "alert-dismissible fade": s, show: h === "entered" },
                r,
              ),
              role: "alert",
            },
            m,
            { ref: v },
          ),
          n,
          s &&
            A.createElement(Ju, {
              onClick: function () {
                return E(!1);
              },
            }),
        );
      },
    )
  );
});
ji.propTypes = {
  children: k.node,
  className: k.string,
  color: Qr.isRequired,
  dismissible: k.bool,
  onClose: k.func,
  variant: k.string,
  visible: k.bool,
};
ji.displayName = "CAlert";
var Xu = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.active,
    i = e.as,
    o = i === void 0 ? "a" : i,
    s = e.className,
    l = e.disabled,
    a = fe(e, ["children", "active", "as", "className", "disabled"]);
  return A.createElement(
    o,
    re(
      { className: ce(s, { active: r, disabled: l }) },
      r && { "aria-current": "page" },
      o === "a" && l && { "aria-disabled": !0, tabIndex: -1 },
      (o === "a" || o === "button") && {
        onClick: function (c) {
          c.preventDefault, !l && a.onClick && a.onClick(c);
        },
      },
      { disabled: l },
      a,
      { ref: t },
    ),
    n,
  );
});
Xu.propTypes = {
  active: k.bool,
  as: k.elementType,
  children: k.node,
  className: k.string,
  disabled: k.bool,
};
Xu.displayName = "CLink";
var ec = f.forwardRef(function (e, t) {
  var n = e.className,
    r = n === void 0 ? "modal-backdrop" : n,
    i = e.visible,
    o = fe(e, ["className", "visible"]),
    s = f.useRef(null),
    l = Yu(t, s);
  return A.createElement(
    Rt,
    { in: i, mountOnEnter: !0, nodeRef: s, timeout: 150, unmountOnExit: !0 },
    function (a) {
      return A.createElement(
        "div",
        re({ className: ce(r, "fade", { show: a === "entered" }) }, o, {
          ref: l,
        }),
      );
    },
  );
});
ec.propTypes = { className: k.string, visible: k.bool };
ec.displayName = "CBackdrop";
var tc = f.forwardRef(function (e, t) {
  var n,
    r = e.children,
    i = e.as,
    o = i === void 0 ? "button" : i,
    s = e.className,
    l = e.color,
    a = e.shape,
    c = e.size,
    d = e.type,
    m = d === void 0 ? "button" : d,
    p = e.variant,
    v = fe(e, [
      "children",
      "as",
      "className",
      "color",
      "shape",
      "size",
      "type",
      "variant",
    ]);
  return A.createElement(
    Xu,
    re(
      { as: v.href ? "a" : o },
      !v.href && { type: m },
      {
        className: ce(
          "btn",
          ((n = {}),
          (n["btn-".concat(l)] = l && !p),
          (n["btn-".concat(p, "-").concat(l)] = l && p),
          (n["btn-".concat(c)] = c),
          n),
          a,
          s,
        ),
      },
      v,
      { ref: t },
    ),
    r,
  );
});
tc.propTypes = {
  as: k.elementType,
  children: k.node,
  className: k.string,
  color: Qr,
  shape: k.string,
  size: k.oneOf(["sm", "lg"]),
  type: k.oneOf(["button", "submit", "reset"]),
  variant: k.oneOf(["outline", "ghost"]),
};
tc.displayName = "CButton";
var Ys = f.forwardRef(function (e, t) {
  var n,
    r = e.children,
    i = e.className,
    o = e.color,
    s = e.textBgColor,
    l = e.textColor,
    a = fe(e, ["children", "className", "color", "textBgColor", "textColor"]);
  return A.createElement(
    "div",
    re(
      {
        className: ce(
          "card",
          ((n = {}),
          (n["bg-".concat(o)] = o),
          (n["text-".concat(l)] = l),
          (n["text-bg-".concat(s)] = s),
          n),
          i,
        ),
      },
      a,
      { ref: t },
    ),
    r,
  );
});
Ys.propTypes = {
  children: k.node,
  className: k.string,
  color: Qr,
  textBgColor: Qr,
  textColor: k.string,
};
Ys.displayName = "CCard";
var Js = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.className,
    i = fe(e, ["children", "className"]);
  return A.createElement(
    "div",
    re({ className: ce("card-body", r) }, i, { ref: t }),
    n,
  );
});
Js.propTypes = { children: k.node, className: k.string };
Js.displayName = "CCardBody";
var nc = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.as,
    i = r === void 0 ? "div" : r,
    o = e.className,
    s = fe(e, ["children", "as", "className"]);
  return A.createElement(
    i,
    re({ className: ce("card-header", o) }, s, { ref: t }),
    n,
  );
});
nc.propTypes = { as: k.elementType, children: k.node, className: k.string };
nc.displayName = "CCardHeader";
var rc = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.as,
    i = r === void 0 ? "img" : r,
    o = e.className,
    s = e.orientation,
    l = fe(e, ["children", "as", "className", "orientation"]);
  return A.createElement(
    i,
    re({ className: ce(s ? "card-img-".concat(s) : "card-img", o) }, l, {
      ref: t,
    }),
    n,
  );
});
rc.propTypes = {
  as: k.elementType,
  children: k.node,
  className: k.string,
  orientation: k.oneOf(["top", "bottom"]),
};
rc.displayName = "CCardImage";
var ic = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.as,
    i = r === void 0 ? "h6" : r,
    o = e.className,
    s = fe(e, ["children", "as", "className"]);
  return A.createElement(
    i,
    re({ className: ce("card-subtitle", o) }, s, { ref: t }),
    n,
  );
});
ic.propTypes = { as: k.elementType, children: k.node, className: k.string };
ic.displayName = "CCardSubtitle";
var js = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.as,
    i = r === void 0 ? "p" : r,
    o = e.className,
    s = fe(e, ["children", "as", "className"]);
  return A.createElement(
    i,
    re({ className: ce("card-text", o) }, s, { ref: t }),
    n,
  );
});
js.propTypes = { as: k.elementType, children: k.node, className: k.string };
js.displayName = "CCardText";
var oc = f.forwardRef(function (e, t) {
  var n = e.children,
    r = e.as,
    i = r === void 0 ? "h5" : r,
    o = e.className,
    s = fe(e, ["children", "as", "className"]);
  return A.createElement(
    i,
    re({ className: ce("card-title", o) }, s, { ref: t }),
    n,
  );
});
oc.propTypes = { as: k.elementType, children: k.node, className: k.string };
oc.displayName = "CCardTitle";
var Ao = function (e) {
    var t = e.getBoundingClientRect();
    return (
      Math.floor(t.top) >= 0 &&
      Math.floor(t.left) >= 0 &&
      Math.floor(t.bottom) <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      Math.floor(t.right) <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  sc = f.forwardRef(function (e, t) {
    var n = e.children,
      r = e.className,
      i = e.customClassName,
      o = fe(e, ["children", "className", "customClassName"]);
    return A.createElement(
      "label",
      re({ className: i ?? ce("form-label", r) }, o, { ref: t }),
      n,
    );
  });
sc.propTypes = {
  children: k.node,
  className: k.string,
  customClassName: k.string,
};
sc.displayName = "CFormLabel";
var lc = f.forwardRef(function (e, t) {
  var n,
    r = e.className,
    i = e.id,
    o = e.invalid,
    s = e.label,
    l = e.reverse,
    a = e.size,
    c = e.type,
    d = c === void 0 ? "checkbox" : c,
    m = e.valid,
    p = fe(e, [
      "className",
      "id",
      "invalid",
      "label",
      "reverse",
      "size",
      "type",
      "valid",
    ]);
  return A.createElement(
    "div",
    {
      className: ce(
        "form-check form-switch",
        ((n = { "form-check-reverse": l }),
        (n["form-switch-".concat(a)] = a),
        (n["is-invalid"] = o),
        (n["is-valid"] = m),
        n),
        r,
      ),
    },
    A.createElement(
      "input",
      re(
        {
          type: d,
          className: ce("form-check-input", { "is-invalid": o, "is-valid": m }),
          id: i,
        },
        p,
        { ref: t },
      ),
    ),
    s &&
      A.createElement(
        sc,
        re({ customClassName: "form-check-label" }, i && { htmlFor: i }),
        s,
      ),
  );
});
lc.propTypes = {
  className: k.string,
  id: k.string,
  invalid: k.bool,
  label: k.oneOfType([k.string, k.node]),
  reverse: k.bool,
  size: k.oneOf(["lg", "xl"]),
  type: k.oneOf(["checkbox", "radio"]),
  valid: k.bool,
};
lc.displayName = "CFormSwitch";
var X0 = ["xxl", "xl", "lg", "md", "sm", "xs"],
  Ts = f.forwardRef(function (e, t) {
    var n = e.children,
      r = e.className,
      i = fe(e, ["children", "className"]),
      o = [];
    return (
      X0.forEach(function (s) {
        var l = i[s];
        delete i[s];
        var a = s === "xs" ? "" : "-".concat(s);
        (typeof l == "number" || typeof l == "string") &&
          o.push("col".concat(a, "-").concat(l)),
          typeof l == "boolean" && o.push("col".concat(a)),
          l &&
            typeof l == "object" &&
            ((typeof l.span == "number" || typeof l.span == "string") &&
              o.push("col".concat(a, "-").concat(l.span)),
            typeof l.span == "boolean" && o.push("col".concat(a)),
            (typeof l.order == "number" || typeof l.order == "string") &&
              o.push("order".concat(a, "-").concat(l.order)),
            typeof l.offset == "number" &&
              o.push("offset".concat(a, "-").concat(l.offset)));
      }),
      A.createElement(
        "div",
        re({ className: ce(o.length > 0 ? o : "col", r) }, i, { ref: t }),
        n,
      )
    );
  }),
  Md = k.oneOfType([k.bool, k.number, k.string, k.oneOf(["auto"])]),
  rr = k.oneOfType([
    Md,
    k.shape({
      span: Md,
      offset: k.oneOfType([k.number, k.string]),
      order: k.oneOfType([k.oneOf(["first", "last"]), k.number, k.string]),
    }),
  ]);
Ts.propTypes = {
  children: k.node,
  className: k.string,
  xs: rr,
  sm: rr,
  md: rr,
  lg: rr,
  xl: rr,
  xxl: rr,
};
Ts.displayName = "CCol";
var ex = ["xxl", "xl", "lg", "md", "sm", "fluid"],
  ac = f.forwardRef(function (e, t) {
    var n = e.children,
      r = e.className,
      i = fe(e, ["children", "className"]),
      o = [];
    return (
      ex.forEach(function (s) {
        var l = i[s];
        delete i[s], l && o.push("container-".concat(s));
      }),
      A.createElement(
        "div",
        re({ className: ce(o.length > 0 ? o : "container", r) }, i, { ref: t }),
        n,
      )
    );
  });
ac.propTypes = {
  children: k.node,
  className: k.string,
  sm: k.bool,
  md: k.bool,
  lg: k.bool,
  xl: k.bool,
  xxl: k.bool,
  fluid: k.bool,
};
ac.displayName = "CContainer";
var tx = ["xxl", "xl", "lg", "md", "sm", "xs"],
  Os = f.forwardRef(function (e, t) {
    var n = e.children,
      r = e.className,
      i = fe(e, ["children", "className"]),
      o = [];
    return (
      tx.forEach(function (s) {
        var l = i[s];
        delete i[s];
        var a = s === "xs" ? "" : "-".concat(s);
        typeof l == "object" &&
          (l.cols && o.push("row-cols".concat(a, "-").concat(l.cols)),
          typeof l.gutter == "number" &&
            o.push("g".concat(a, "-").concat(l.gutter)),
          typeof l.gutterX == "number" &&
            o.push("gx".concat(a, "-").concat(l.gutterX)),
          typeof l.gutterY == "number" &&
            o.push("gy".concat(a, "-").concat(l.gutterY)));
      }),
      A.createElement(
        "div",
        re({ className: ce("row", o, r) }, i, { ref: t }),
        n,
      )
    );
  }),
  ir = k.shape({
    cols: k.oneOfType([k.oneOf(["auto"]), k.number, k.string]),
    gutter: k.oneOfType([k.string, k.number]),
    gutterX: k.oneOfType([k.string, k.number]),
    gutterY: k.oneOfType([k.string, k.number]),
  });
Os.propTypes = {
  children: k.node,
  className: k.string,
  xs: ir,
  sm: ir,
  md: ir,
  lg: ir,
  xl: ir,
  xxl: ir,
};
Os.displayName = "CRow";
var Xs = f.forwardRef(function (e, t) {
  var n,
    r = e.align,
    i = e.className,
    o = e.fluid,
    s = e.rounded,
    l = e.thumbnail,
    a = fe(e, ["align", "className", "fluid", "rounded", "thumbnail"]);
  return A.createElement(
    "img",
    re(
      {
        className:
          ce(
            ((n = {}),
            (n["float-".concat(r)] = r && (r === "start" || r === "end")),
            (n["d-block mx-auto"] = r && r === "center"),
            (n["img-fluid"] = o),
            (n.rounded = s),
            (n["img-thumbnail"] = l),
            n),
            i,
          ) || void 0,
      },
      a,
      { ref: t },
    ),
  );
});
Xs.propTypes = {
  align: k.oneOf(["start", "center", "end"]),
  className: k.string,
  fluid: k.bool,
  rounded: k.bool,
  thumbnail: k.bool,
};
Xs.displayName = "CImage";
var bl = function (e) {
    return !!getComputedStyle(e).getPropertyValue("--cui-is-mobile");
  },
  uc = f.forwardRef(function (e, t) {
    var n,
      r = e.children,
      i = e.className,
      o = e.colorScheme,
      s = e.narrow,
      l = e.onHide,
      a = e.onShow,
      c = e.onVisibleChange,
      d = e.overlaid,
      m = e.placement,
      p = e.position,
      v = e.size,
      x = e.unfoldable,
      w = e.visible,
      E = fe(e, [
        "children",
        "className",
        "colorScheme",
        "narrow",
        "onHide",
        "onShow",
        "onVisibleChange",
        "overlaid",
        "placement",
        "position",
        "size",
        "unfoldable",
        "visible",
      ]),
      h = f.useRef(null),
      g = Yu(t, h),
      y = f.useState(),
      S = y[0],
      N = y[1],
      j = f.useState(!1),
      T = j[0],
      O = j[1],
      L = f.useState(!1),
      R = L[0],
      Q = L[1],
      ye = f.useState(w !== void 0 ? w : !d),
      Gt = ye[0],
      co = ye[1];
    f.useEffect(
      function () {
        h.current && O(bl(h.current)), w !== void 0 && fo(w);
      },
      [w],
    ),
      f.useEffect(
        function () {
          S !== void 0 && c && c(S), !S && l && l(), S && a && a();
        },
        [S],
      ),
      f.useEffect(
        function () {
          T && Q(!1);
        },
        [T],
      ),
      f.useEffect(function () {
        var H, G;
        return (
          h.current && O(bl(h.current)),
          h.current && N(Ao(h.current)),
          window.addEventListener("resize", er),
          window.addEventListener("mouseup", M),
          window.addEventListener("keyup", I),
          (H = h.current) === null ||
            H === void 0 ||
            H.addEventListener("mouseup", F),
          (G = h.current) === null ||
            G === void 0 ||
            G.addEventListener("transitionend", function () {
              h.current && N(Ao(h.current));
            }),
          function () {
            var qt, st;
            window.removeEventListener("resize", er),
              window.removeEventListener("mouseup", M),
              window.removeEventListener("keyup", I),
              (qt = h.current) === null ||
                qt === void 0 ||
                qt.removeEventListener("mouseup", F),
              (st = h.current) === null ||
                st === void 0 ||
                st.removeEventListener("transitionend", function () {
                  h.current && N(Ao(h.current));
                });
          }
        );
      });
    var fo = function (H) {
        if (T) {
          Q(H);
          return;
        }
        co(H);
      },
      jn = function () {
        fo(!1);
      },
      er = function () {
        h.current && O(bl(h.current)), h.current && N(Ao(h.current));
      },
      I = function (H) {
        T && h.current && !h.current.contains(H.target) && jn();
      },
      M = function (H) {
        T && h.current && !h.current.contains(H.target) && jn();
      },
      F = function (H) {
        var G = H.target;
        G &&
          G.classList.contains("nav-link") &&
          !G.classList.contains("nav-group-toggle") &&
          T &&
          jn();
      };
    return A.createElement(
      A.Fragment,
      null,
      A.createElement(
        "div",
        re(
          {
            className: ce(
              "sidebar",
              ((n = {}),
              (n["sidebar-".concat(o)] = o),
              (n["sidebar-narrow"] = s),
              (n["sidebar-overlaid"] = d),
              (n["sidebar-".concat(m)] = m),
              (n["sidebar-".concat(p)] = p),
              (n["sidebar-".concat(v)] = v),
              (n["sidebar-narrow-unfoldable"] = x),
              (n.show = (T && R) || (d && Gt)),
              (n.hide = Gt === !1 && !T && !d),
              n),
              i,
            ),
          },
          E,
          { ref: g },
        ),
        r,
      ),
      typeof window < "u" &&
        T &&
        Gs.createPortal(
          A.createElement(ec, {
            className: "sidebar-backdrop",
            visible: T && R,
          }),
          document.body,
        ),
    );
  });
uc.propTypes = {
  children: k.node,
  className: k.string,
  colorScheme: k.oneOf(["dark", "light"]),
  narrow: k.bool,
  onHide: k.func,
  onShow: k.func,
  onVisibleChange: k.func,
  overlaid: k.bool,
  placement: k.oneOf(["start", "end"]),
  position: k.oneOf(["fixed", "sticky"]),
  size: k.oneOf(["sm", "lg", "xl"]),
  unfoldable: k.bool,
  visible: k.bool,
};
uc.displayName = "CSidebar";
var Lt = f.forwardRef(function (e, t) {
  var n,
    r = e.as,
    i = r === void 0 ? "div" : r,
    o = e.className,
    s = e.color,
    l = e.size,
    a = e.variant,
    c = a === void 0 ? "border" : a,
    d = e.visuallyHiddenLabel,
    m = d === void 0 ? "Loading..." : d,
    p = fe(e, [
      "as",
      "className",
      "color",
      "size",
      "variant",
      "visuallyHiddenLabel",
    ]);
  return A.createElement(
    i,
    re(
      {
        className: ce(
          "spinner-".concat(c),
          ((n = {}),
          (n["spinner-".concat(c, "-").concat(l)] = l),
          (n["text-".concat(s)] = s),
          n),
          o,
        ),
        role: "status",
      },
      p,
      { ref: t },
    ),
    A.createElement("span", { className: "visually-hidden" }, m),
  );
});
Lt.propTypes = {
  as: k.string,
  className: k.string,
  color: Qr,
  size: k.oneOf(["sm"]),
  variant: k.oneOf(["border", "grow"]),
  visuallyHiddenLabel: k.string,
};
Lt.displayName = "CSpinner";
const el = "/assets/under-development-BP8UTegg.webp";
function nx(e, t) {
  const [n, r] = f.useState(e);
  return (
    f.useEffect(() => {
      if (t === 0) return;
      const i = setTimeout(() => {
        r(e);
      }, t);
      return () => {
        clearTimeout(i);
      };
    }, [e, t]),
    n
  );
}
function rx({ tags: e, onActiveTagsChange: t = () => {} }) {
  const [n, r] = f.useState([]),
    i = (o, s) => {
      r((l) => (s ? [...l, o].sort() : l.filter((a) => a != o)));
    };
  return (
    f.useEffect(() => {
      t(n);
    }, [n, t]),
    u.jsx(u.Fragment, {
      children: u.jsxs(Je, {
        className: "space-0",
        children: [
          u.jsx("span", {
            className: "text-neutral-500 text-xs",
            children: "Tags",
          }),
          u.jsx($t, {
            className: "mt-1",
            children: e.map((o, s) => u.jsx(ix, { text: o, onClick: i }, s)),
          }),
        ],
      }),
    })
  );
}
function ix({ text: e, className: t = "", onClick: n = () => {} }) {
  const [r, i] = f.useState(!1),
    o = () => {
      i((s) => !s), n(e, !r);
    };
  return u.jsx(u.Fragment, {
    children: u.jsx("input", {
      type: "button",
      className: `${r ? "bg-primary-500 text-white" : "bg-neutral-100 hover:bg-primary-300 hover:text-white"} border-none text-sm m-1 p-2 rounded-full cursor-pointer transition-colors ${t}`,
      onClick: o,
      value: e,
    }),
  });
}
function ox({ placeholder: e = "", onValueChange: t, delayMs: n = 0 }) {
  const [r, i] = f.useState(""),
    o = nx(r, n),
    s = (l) => {
      i(l.currentTarget.value);
    };
  return (
    f.useEffect(() => {
      t(o);
    }, [o, t]),
    u.jsx(u.Fragment, {
      children: u.jsx("input", { type: "text", placeholder: e, onChange: s }),
    })
  );
}
function Ps({ name: e, onChange: t, placeholder: n = "" }) {
  const r = f.useCallback(
    (i) => {
      t(i.currentTarget.value, e);
    },
    [t, e],
  );
  return u.jsx(u.Fragment, {
    children: u.jsx("input", {
      type: "text",
      placeholder: n,
      name: e,
      onChange: r,
    }),
  });
}
function qp({ label: e, max: t = 100, itemRenderer: n, onDataChange: r }) {
  const [i, o] = f.useState(new Map()),
    [s, l] = f.useState([]),
    a = f.useMemo(() => s.length >= t, [t, s.length]),
    c = f.useCallback((E) => {
      o((h) => {
        const g = new Map(h);
        return g.set(E, {}), g;
      });
    }, []),
    d = f.useCallback(
      (E, h) => {
        o((g) => {
          const y = new Map(g);
          return y.set(E, h(y.get(E) || {})), y;
        });
      },
      [o],
    ),
    m = (E) =>
      o((h) => {
        const g = new Map(h);
        return g.delete(E), g;
      }),
    p = f.useCallback((E) => {
      m(E), l((h) => h.filter((g) => f.isValidElement(g) && g.key !== E));
    }, []),
    v = f.useCallback(
      (E, h) => {
        const g = E.currentTarget;
        d(h, (y) => ({ ...y, [g.name]: g.value }));
      },
      [d],
    ),
    x = f.useCallback(() => {
      l((E) => {
        if (E.length < t) {
          const h = E.length.toString(),
            g = (S) => {
              v(S, h);
            },
            y = () => {
              p(h);
            };
          return c(h), [...E, u.jsx("div", { children: n(g, y) }, h)];
        }
        return E;
      });
    }, [c, v, n, t, p]),
    w = f.useCallback(() => {
      x();
    }, [x]);
  return (
    f.useEffect(() => {
      s.length < 1 && x();
    }, [x, s.length]),
    f.useEffect(() => {
      r([...i.values()]), console.count("Address Changed: ");
    }, [i, r]),
    u.jsxs("div", {
      children: [
        u.jsxs("span", {
          className: "flex justify-between align-center",
          children: [
            e,
            a
              ? null
              : u.jsx(Ns, {
                  onClick: (E) => {
                    E.preventDefault(), w();
                  },
                  children: "Add",
                }),
          ],
        }),
        s,
      ],
    })
  );
}
const sx = {};
class Zp {
  constructor() {
    On(this, "tags", []);
    On(this, "search", "");
    On(this, "cities", []);
    On(this, "date", Date.now());
    On(this, "contact", "");
  }
}
function lx({
  initialValues: e = new Zp(),
  onSearchTermChange: t = () => {},
  onActiveTagsChange: n = () => {},
}) {
  const [r] = f.useState(e),
    i = f.useMemo(() => r.tags, [r.tags]);
  return u.jsxs(yt, {
    className: `${sx["filter-form"]}`,
    children: [
      u.jsx($t, {
        children: u.jsx(ox, {
          delayMs: 800,
          placeholder: "Search",
          onValueChange: t,
        }),
      }),
      u.jsxs($t, {
        children: [
          u.jsxs("select", {
            className: "bg-white border-1 border-slate-300 rounded-md p-2",
            onChange: (o) => {
              console.log(o.currentTarget.value);
            },
            children: [
              u.jsx("option", { children: "Newest" }),
              u.jsx("option", { children: "Oldest" }),
            ],
          }),
          u.jsx("input", { type: "datetime-local" }),
        ],
      }),
      u.jsx($t, { children: u.jsx(rx, { tags: i, onActiveTagsChange: n }) }),
    ],
  });
}
function ax({ buttons: e = [] }) {
  return u.jsx(u.Fragment, {
    children: u.jsxs(uc, {
      className: "cust-sidebar",
      children: [u.jsx(ux, {}), u.jsx(cx, { buttons: e })],
    }),
  });
}
function ux() {
  return u.jsxs("div", {
    className: "cust-sidebar-brand",
    children: [
      u.jsx("i", { className: "material-icons", children: "whatshot" }),
      u.jsx("span", { className: "sidebar-title", children: "Locus Point" }),
    ],
  });
}
function cx({ buttons: e = [] }) {
  return u.jsx("nav", {
    className: "cust-sidebar-nav",
    children: e.map((t, n) =>
      u.jsx(dx, { label: t.label, coreUiIcon: t.coreUiIcon, to: t.to }, n),
    ),
  });
}
function dx({ label: e, coreUiIcon: t, to: n }) {
  return u.jsx(u.Fragment, {
    children: u.jsxs(Ap, {
      to: n,
      className: ({ isActive: r }) =>
        ["cust-sidebar-button", r ? "active" : ""].join(" "),
      children: [
        u.jsx("span", { className: "active-highlight" }),
        u.jsxs("span", {
          className: "content",
          children: [u.jsx(Qt, { className: "cust-button-icon", icon: t }), e],
        }),
      ],
    }),
  });
}
const Yp = "AUTH_TOKEN";
function it() {
  return localStorage.getItem(Yp) || "";
}
function Jp(e) {
  localStorage.setItem(Yp, e), window.dispatchEvent(new Event("token-change"));
}
function Xp() {
  Jp("");
}
function _a() {
  return it() !== "";
}
function fx({
  badgeImageSrc: e = el,
  className: t = "userProfile",
  actionButtons: n = [],
}) {
  const r = ze(),
    i = () => {
      Xp(), r(B.HOME);
    },
    o = () => {
      r(B.PROFILE);
    };
  return u.jsxs("div", {
    className: `icon-container ${t}`,
    children: [
      u.jsx(Hp, {
        itemIndex: 0,
        actions: { Profile: o, Logout: i },
        children: u.jsx(Xs, {
          className: "user-badge",
          src: e,
          width: 40,
          height: 40,
        }),
      }),
      n.map((s, l) =>
        u.jsx(hx, { icon: s.icon, scale: s.scale, onClick: s.onClick }, l),
      ),
    ],
  });
}
function hx({ icon: e, scale: t = 1, onClick: n = () => {} }) {
  return u.jsx("button", {
    className: "icon-button",
    onClick: n,
    children: u.jsx(Qt, { icon: e, style: { transform: `scale(${t})` } }),
  });
}
function px() {
  const e = Kt(),
    [t, n] = f.useState(_a()),
    [r] = f.useState([
      { label: "Productions", coreUiIcon: _0, to: B.PRODUCTIONS },
      { label: "Locations", coreUiIcon: z0, to: B.LOCATIONS },
      { label: "Contacts", coreUiIcon: b0, to: B.CONTACTS },
      { label: "Calendar", coreUiIcon: A0, to: B.CALENDAR },
    ]);
  return (
    f.useEffect(() => {
      n(_a());
    }, [e]),
    t
      ? u.jsxs("div", {
          className: "dashboard-layout overflow-hidden",
          children: [
            u.jsx(ax, { buttons: r }),
            u.jsxs("div", {
              className: "flex flex-column items-center justify-start w-full",
              children: [
                u.jsx(fx, { className: "flex-grow-0 w-full" }),
                u.jsx("div", {
                  className: "flex flex-col w-full max-w-screen-xl pt-0 pr-10",
                  children: u.jsx(Lp, {}),
                }),
              ],
            }),
          ],
        })
      : u.jsx(Pp, { to: B.LOGIN, replace: !0 })
  );
}
function Ke({ title: e, buttons: t = [], leftButtons: n = [] }) {
  return u.jsxs("div", {
    className: "mt-12 mb-3",
    children: [
      u.jsx("h1", {
        className: "text-4xl text-gray-500 pl-4 pb-3",
        children: e,
      }),
      u.jsxs("div", {
        className: "flex flex-row justify-between items-center",
        children: [
          u.jsx("div", {
            className: "pl-4 flex gap-2",
            children: n.map((r, i) =>
              f.createElement(Ns, {
                ...r,
                key: i,
                className: `!bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-lg shadow-sm 
                         hover:!bg-gray-100 transition-all duration-200`,
              }),
            ),
          }),
          u.jsx("div", {
            className: "flex gap-3",
            children: t.map((r, i) => f.createElement(Ns, { ...r, key: i })),
          }),
        ],
      }),
    ],
  });
}
const mx = "/api/v1/auth/register",
  gx = "/api/v1/auth/login",
  yx = "/api/v1/users",
  ei = "/api/v1/contacts",
  lo = "/api/v1/locations",
  tl = "/api/v1/productions",
  vx = `${yx}/who-am-i`;
class xx extends Error {
  constructor(n, r = "", i = "") {
    super(i);
    On(this, "code");
    (this.code = n), (this.name = r);
  }
}
async function ot(e, t = {}) {
  const n = new Headers(t.headers);
  return (
    t.authenticate && n.set("Authorization", `Bearer ${it()}`),
    fetch(e, { ...t, headers: n }).then((r) => {
      if (!r.ok) throw new xx(r.status, r.statusText);
      return r.json();
    })
  );
}
async function wx() {
  return ot(`${lo}/all`, { method: "GET", authenticate: !0 });
}
async function em(e) {
  return ot(`${lo}/${e}`, { method: "GET", authenticate: !0 });
}
async function Cx(e) {
  const t = JSON.stringify(e);
  return ot(`${lo}`, {
    method: "POST",
    authenticate: !0,
    headers: { "Content-Type": "application/json" },
    body: t,
  });
}
async function tm() {
  try {
    const t = await (
      await fetch(`${lo}/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${it()}` },
      })
    ).json();
    return Array.isArray(t)
      ? t.map((n, r) => ({ ...n, id: n.locationId ?? `location-${r}` }))
      : new Error("Unexpected response format");
  } catch {
    return new Error("Failed to fetch user locations");
  }
}
async function Sx(e) {
  const t = it(),
    n = await fetch(`/api/v1/locations/${e}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${t}` },
    });
  if (!n.ok) {
    const r = await n.text();
    throw new Error(r || "Failed to delete location");
  }
}
async function Ex(e, t) {
  const n = JSON.stringify(t);
  return ot(`${lo}/${e}`, {
    method: "PUT",
    authenticate: !0,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${it()}`,
    },
    body: n,
  });
}
const Nx = async (e) => {
    const t = await fetch(mx, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    if (!t.ok) {
      const n = await t.json();
      throw n.errors ? n : new Error(n.message || "Registration failed");
    }
  },
  kx = async (e) => {
    const t = await fetch(gx, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    if (!t.ok) {
      const r = await t.json();
      throw new Error(r.message || "Login failed");
    }
    const n = await t.json();
    console.log("data" + JSON.stringify(n)), Jp(n.accessToken);
  },
  jx = async () => {
    const e = it();
    if (!e) throw new Error("No authentication token found. Please log in.");
    const t = await fetch(`${vx}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`,
      },
    });
    if (!t.ok) {
      const r = await t.json();
      throw new Error(r.message || `Failed to feth profile: ${t.status}`);
    }
    const n = await t.json();
    return console.log("HERE" + n), n;
  },
  cc = (e) => {
    Xp(), e(B.HOME);
  };
function Tx() {
  const e = ze(),
    [t, n] = f.useState([]),
    [r, i] = f.useState(!1),
    [o, s] = f.useState(null),
    l = async () => {
      try {
        i(!0);
        const p = await wx();
        n(p), s(null);
      } catch (p) {
        s("Failed to load locations"),
          console.warn(p),
          String(p).includes("Unauthorized") && cc(e);
      } finally {
        i(!1);
      }
    };
  f.useEffect(() => {
    l();
  }, []);
  const a = async (p) => {
      const v = t[p];
      if (!(!v || !v.locationId))
        try {
          await Sx(v.locationId), l();
        } catch (x) {
          console.error("Failed to delete location:", x),
            s("Failed to delete location");
        }
    },
    c = f.useMemo(
      () =>
        t.map((p) => ({
          id: p.locationId,
          thumbnail: u.jsx(Xs, {
            src: el,
            width: 120,
            height: 80,
            rounded: !0,
            alt: "Location thumbnail",
          }),
          name: p.name || "Unnamed",
          address: "Probably Jupiter, IDK",
          tags: p.keywords.map((v, x) =>
            u.jsx(
              "span",
              {
                className: "mr-1 inline-block bg-gray-200 px-2 py-1 rounded",
                children: v,
              },
              x,
            ),
          ),
          scout: p.name,
        })),
      [t],
    ),
    d = f.useCallback((p) => {
      console.log("Search term: ", p);
    }, []),
    m = f.useCallback((p) => {
      console.log("Active tags: ", p);
    }, []);
  return r
    ? u.jsx("p", { children: "Loading locations..." })
    : o
      ? u.jsxs("p", { children: ["Error: ", o] })
      : u.jsxs(u.Fragment, {
          children: [
            u.jsx(Ke, {
              title: "Locations",
              buttons: [
                {
                  children: "ADD NEW LOCATION",
                  onClick: () => {
                    e("add");
                  },
                },
              ],
            }),
            u.jsx(lx, {
              initialValues: {
                ...new Zp(),
                tags: ["Foo", "Bar", "Baz", "Zoo"],
              },
              onSearchTermChange: d,
              onActiveTagsChange: m,
            }),
            u.jsxs($t, {
              className: "py-4 px-3 justify-between",
              children: [
                u.jsxs($t, {
                  children: [
                    u.jsx("span", { children: "Results" }),
                    u.jsx("span", { children: "|" }),
                    u.jsx("span", { children: "All" }),
                    u.jsx("span", { children: "My Locations" }),
                    u.jsx("span", { children: "Shared with me" }),
                  ],
                }),
                u.jsxs($t, {
                  children: [
                    "Toggle Map: ",
                    u.jsx(lc, {}),
                    u.jsx(Qt, { icon: M0, className: "ml-2" }),
                    u.jsx(Qt, { icon: F0, className: "ml-2" }),
                  ],
                }),
              ],
            }),
            u.jsx(Bp, {
              columnNames: {
                thumbnail: "THUMBNAIL",
                name: "NAME",
                address: "ADDRESS",
                tags: "TAGS",
                scout: "SCOUT",
              },
              data: c,
              actions: {
                Edit: (p) => {
                  var x;
                  const v = (x = c[p]) == null ? void 0 : x.id;
                  v !== void 0 && e(`${ae.EDIT_LOCATION}/${String(v)}`);
                },
                Delete: a,
              },
              onRowClick: (p) => {
                var x;
                const v = (x = c[p]) == null ? void 0 : x.id;
                v !== void 0 && e(String(v));
              },
            }),
          ],
        });
}
var Dn = ((e) => (
  (e[(e.Initial = 0)] = "Initial"),
  (e[(e.Loading = 1)] = "Loading"),
  (e[(e.Success = 2)] = "Success"),
  (e[(e.Fail = 3)] = "Fail"),
  e
))(Dn || {});
function Ox(e = () => {}) {
  const [t, n] = f.useState(0),
    r = (i) => {
      n(i);
    };
  return (
    f.useEffect(() => {
      e(t);
    }, [t, n, e]),
    [t, r]
  );
}
function Px() {
  const [e, t] = Ox(),
    [n, r] = f.useState(""),
    i = f.useMemo(() => {
      switch (e) {
        case Dn.Success:
          return u.jsxs("h1", { children: ["Success: ", n] });
        case Dn.Fail:
          return u.jsxs("h1", { children: ["Error: ", n] });
        default:
          return null;
      }
    }, [e, n]),
    [o, s] = f.useState({
      addresses: {},
      name: "",
      locationType: "",
      notes: "",
      keywords: [],
      candidateIds: [],
      contactIds: [],
      locationPhotoIds: [],
    }),
    l = f.useCallback(
      (d, m) => {
        s((p) => ({ ...p, [m]: d }));
      },
      [s],
    ),
    a = f.useCallback((d) => {
      s((m) => {
        const p = new Map();
        return (
          d.forEach((v, x) => {
            p.set(x, v);
          }),
          { ...m, addresses: Object.fromEntries(p) }
        );
      });
    }, []),
    c = f.useCallback(
      (d) => {
        d.preventDefault(),
          e !== Dn.Loading &&
            (t(Dn.Loading),
            Cx(o)
              .then((m) => {
                r(m.locationId || "Location ID is empty for some reason."),
                  t(Dn.Success);
              })
              .catch((m) => {
                r(m.name), t(Dn.Fail);
              }));
      },
      [o, t, e],
    );
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(Ke, { title: "Add New Location" }),
      u.jsx(yt, {
        children: u.jsx("form", {
          children: u.jsxs(Je, {
            children: [
              u.jsx(Ps, {
                name: "name",
                onChange: l,
                placeholder: "Location name",
              }),
              u.jsx(Ps, {
                name: "notes",
                onChange: l,
                placeholder: "Add a description",
              }),
              u.jsx(qp, {
                label: "Address",
                max: 4,
                itemRenderer: f.useCallback(
                  (d, m) =>
                    u.jsxs(Je, {
                      className:
                        "gap-2 my-2 border-1 border-gray-300 rounded p-3 bg-gray-50",
                      children: [
                        u.jsx("span", {
                          className: "flex justify-end",
                          children: u.jsx(Qt, {
                            className: "hover:cursor-pointer",
                            icon: Up,
                            onClick: m,
                          }),
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "postalCode",
                          onChange: d,
                          placeholder: "Postal Code",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "addressLine1",
                          onChange: d,
                          placeholder: "Address Line 1",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "addressLine2",
                          onChange: d,
                          placeholder: "Address Line 2",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "stateProvinceRegion",
                          onChange: d,
                          placeholder: "Province or State",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "city",
                          onChange: d,
                          placeholder: "City",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "country",
                          onChange: d,
                          placeholder: "Country",
                        }),
                        u.jsx("input", {
                          type: "hidden",
                          name: "longitude",
                          onChange: d,
                          placeholder: "Longitude",
                        }),
                        u.jsx("input", {
                          type: "hidden",
                          name: "Latitude",
                          onChange: d,
                          placeholder: "Add a description",
                        }),
                      ],
                    }),
                  [],
                ),
                onDataChange: a,
              }),
              i,
              u.jsx("input", {
                type: "submit",
                value: "Add New Location",
                onClick: c,
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
var ao = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          this.listeners.delete(e), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Yn = typeof window > "u" || "Deno" in globalThis;
function qe() {}
function Lx(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ba(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function nm(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Nr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ft(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Fd(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: i,
    predicate: o,
    queryKey: s,
    stale: l,
  } = e;
  if (s) {
    if (r) {
      if (t.queryHash !== dc(s, t.options)) return !1;
    } else if (!Ki(t.queryKey, s)) return !1;
  }
  if (n !== "all") {
    const a = t.isActive();
    if ((n === "active" && !a) || (n === "inactive" && a)) return !1;
  }
  return !(
    (typeof l == "boolean" && t.isStale() !== l) ||
    (i && i !== t.state.fetchStatus) ||
    (o && !o(t))
  );
}
function zd(e, t) {
  const { exact: n, status: r, predicate: i, mutationKey: o } = e;
  if (o) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (Wi(t.options.mutationKey) !== Wi(o)) return !1;
    } else if (!Ki(t.options.mutationKey, o)) return !1;
  }
  return !((r && t.state.status !== r) || (i && !i(t)));
}
function dc(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Wi)(e);
}
function Wi(e) {
  return JSON.stringify(e, (t, n) =>
    Fa(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, i) => ((r[i] = n[i]), r), {})
      : n,
  );
}
function Ki(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == "object" && typeof t == "object"
        ? !Object.keys(t).some((n) => !Ki(e[n], t[n]))
        : !1;
}
function rm(e, t) {
  if (e === t) return e;
  const n = $d(e) && $d(t);
  if (n || (Fa(e) && Fa(t))) {
    const r = n ? e : Object.keys(e),
      i = r.length,
      o = n ? t : Object.keys(t),
      s = o.length,
      l = n ? [] : {};
    let a = 0;
    for (let c = 0; c < s; c++) {
      const d = n ? c : o[c];
      ((!n && r.includes(d)) || n) && e[d] === void 0 && t[d] === void 0
        ? ((l[d] = void 0), a++)
        : ((l[d] = rm(e[d], t[d])), l[d] === e[d] && e[d] !== void 0 && a++);
    }
    return i === s && a === i ? e : l;
  }
  return t;
}
function Ma(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function $d(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Fa(e) {
  if (!Ud(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !Ud(n) ||
    !n.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Ud(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Rx(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function za(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
      ? rm(e, t)
      : t;
}
function Ix(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function Dx(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var fc = Symbol();
function im(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === fc
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
var Mn,
  nn,
  kr,
  Yd,
  Ax =
    ((Yd = class extends ao {
      constructor() {
        super();
        b(this, Mn);
        b(this, nn);
        b(this, kr);
        _(this, kr, (t) => {
          if (!Yn && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener("visibilitychange", n, !1),
              () => {
                window.removeEventListener("visibilitychange", n);
              }
            );
          }
        });
      }
      onSubscribe() {
        C(this, nn) || this.setEventListener(C(this, kr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = C(this, nn)) == null || t.call(this), _(this, nn, void 0));
      }
      setEventListener(t) {
        var n;
        _(this, kr, t),
          (n = C(this, nn)) == null || n.call(this),
          _(
            this,
            nn,
            t((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            }),
          );
      }
      setFocused(t) {
        C(this, Mn) !== t && (_(this, Mn, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach((n) => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof C(this, Mn) == "boolean"
          ? C(this, Mn)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !==
              "hidden";
      }
    }),
    (Mn = new WeakMap()),
    (nn = new WeakMap()),
    (kr = new WeakMap()),
    Yd),
  hc = new Ax(),
  jr,
  rn,
  Tr,
  Jd,
  _x =
    ((Jd = class extends ao {
      constructor() {
        super();
        b(this, jr, !0);
        b(this, rn);
        b(this, Tr);
        _(this, Tr, (t) => {
          if (!Yn && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener("online", n, !1),
              window.addEventListener("offline", r, !1),
              () => {
                window.removeEventListener("online", n),
                  window.removeEventListener("offline", r);
              }
            );
          }
        });
      }
      onSubscribe() {
        C(this, rn) || this.setEventListener(C(this, Tr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = C(this, rn)) == null || t.call(this), _(this, rn, void 0));
      }
      setEventListener(t) {
        var n;
        _(this, Tr, t),
          (n = C(this, rn)) == null || n.call(this),
          _(this, rn, t(this.setOnline.bind(this)));
      }
      setOnline(t) {
        C(this, jr) !== t &&
          (_(this, jr, t),
          this.listeners.forEach((r) => {
            r(t);
          }));
      }
      isOnline() {
        return C(this, jr);
      }
    }),
    (jr = new WeakMap()),
    (rn = new WeakMap()),
    (Tr = new WeakMap()),
    Jd),
  Ls = new _x();
function $a() {
  let e, t;
  const n = new Promise((i, o) => {
    (e = i), (t = o);
  });
  (n.status = "pending"), n.catch(() => {});
  function r(i) {
    Object.assign(n, i), delete n.resolve, delete n.reject;
  }
  return (
    (n.resolve = (i) => {
      r({ status: "fulfilled", value: i }), e(i);
    }),
    (n.reject = (i) => {
      r({ status: "rejected", reason: i }), t(i);
    }),
    n
  );
}
function bx(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function om(e) {
  return (e ?? "online") === "online" ? Ls.isOnline() : !0;
}
var sm = class extends Error {
  constructor(e) {
    super("CancelledError"),
      (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent);
  }
};
function Ml(e) {
  return e instanceof sm;
}
function lm(e) {
  let t = !1,
    n = 0,
    r = !1,
    i;
  const o = $a(),
    s = (w) => {
      var E;
      r || (p(new sm(w)), (E = e.abort) == null || E.call(e));
    },
    l = () => {
      t = !0;
    },
    a = () => {
      t = !1;
    },
    c = () =>
      hc.isFocused() &&
      (e.networkMode === "always" || Ls.isOnline()) &&
      e.canRun(),
    d = () => om(e.networkMode) && e.canRun(),
    m = (w) => {
      var E;
      r ||
        ((r = !0),
        (E = e.onSuccess) == null || E.call(e, w),
        i == null || i(),
        o.resolve(w));
    },
    p = (w) => {
      var E;
      r ||
        ((r = !0),
        (E = e.onError) == null || E.call(e, w),
        i == null || i(),
        o.reject(w));
    },
    v = () =>
      new Promise((w) => {
        var E;
        (i = (h) => {
          (r || c()) && w(h);
        }),
          (E = e.onPause) == null || E.call(e);
      }).then(() => {
        var w;
        (i = void 0), r || (w = e.onContinue) == null || w.call(e);
      }),
    x = () => {
      if (r) return;
      let w;
      const E = n === 0 ? e.initialPromise : void 0;
      try {
        w = E ?? e.fn();
      } catch (h) {
        w = Promise.reject(h);
      }
      Promise.resolve(w)
        .then(m)
        .catch((h) => {
          var j;
          if (r) return;
          const g = e.retry ?? (Yn ? 0 : 3),
            y = e.retryDelay ?? bx,
            S = typeof y == "function" ? y(n, h) : y,
            N =
              g === !0 ||
              (typeof g == "number" && n < g) ||
              (typeof g == "function" && g(n, h));
          if (t || !N) {
            p(h);
            return;
          }
          n++,
            (j = e.onFail) == null || j.call(e, n, h),
            Rx(S)
              .then(() => (c() ? void 0 : v()))
              .then(() => {
                t ? p(h) : x();
              });
        });
    };
  return {
    promise: o,
    cancel: s,
    continue: () => (i == null || i(), o),
    cancelRetry: l,
    continueRetry: a,
    canStart: d,
    start: () => (d() ? x() : v().then(x), o),
  };
}
function Mx() {
  let e = [],
    t = 0,
    n = (l) => {
      l();
    },
    r = (l) => {
      l();
    },
    i = (l) => setTimeout(l, 0);
  const o = (l) => {
      t
        ? e.push(l)
        : i(() => {
            n(l);
          });
    },
    s = () => {
      const l = e;
      (e = []),
        l.length &&
          i(() => {
            r(() => {
              l.forEach((a) => {
                n(a);
              });
            });
          });
    };
  return {
    batch: (l) => {
      let a;
      t++;
      try {
        a = l();
      } finally {
        t--, t || s();
      }
      return a;
    },
    batchCalls:
      (l) =>
      (...a) => {
        o(() => {
          l(...a);
        });
      },
    schedule: o,
    setNotifyFunction: (l) => {
      n = l;
    },
    setBatchNotifyFunction: (l) => {
      r = l;
    },
    setScheduler: (l) => {
      i = l;
    },
  };
}
var xe = Mx(),
  Fn,
  Xd,
  am =
    ((Xd = class {
      constructor() {
        b(this, Fn);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          ba(this.gcTime) &&
            _(
              this,
              Fn,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime),
            );
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (Yn ? 1 / 0 : 5 * 60 * 1e3),
        );
      }
      clearGcTimeout() {
        C(this, Fn) && (clearTimeout(C(this, Fn)), _(this, Fn, void 0));
      }
    }),
    (Fn = new WeakMap()),
    Xd),
  Or,
  Pr,
  Ge,
  Ne,
  Zi,
  zn,
  ut,
  It,
  ef,
  Fx =
    ((ef = class extends am {
      constructor(t) {
        super();
        b(this, ut);
        b(this, Or);
        b(this, Pr);
        b(this, Ge);
        b(this, Ne);
        b(this, Zi);
        b(this, zn);
        _(this, zn, !1),
          _(this, Zi, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          _(this, Ge, t.cache),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          _(this, Or, zx(this.options)),
          (this.state = t.state ?? C(this, Or)),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var t;
        return (t = C(this, Ne)) == null ? void 0 : t.promise;
      }
      setOptions(t) {
        (this.options = { ...C(this, Zi), ...t }),
          this.updateGcTime(this.options.gcTime);
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          C(this, Ge).remove(this);
      }
      setData(t, n) {
        const r = za(this.state.data, t, this.options);
        return (
          $(this, ut, It).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        $(this, ut, It).call(this, {
          type: "setState",
          state: t,
          setStateOptions: n,
        });
      }
      cancel(t) {
        var r, i;
        const n = (r = C(this, Ne)) == null ? void 0 : r.promise;
        return (
          (i = C(this, Ne)) == null || i.cancel(t),
          n ? n.then(qe).catch(qe) : Promise.resolve()
        );
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(C(this, Or));
      }
      isActive() {
        return this.observers.some((t) => ft(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === fc ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
            ? this.observers.some((t) => t.getCurrentResult().isStale)
            : this.state.data === void 0;
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !nm(this.state.dataUpdatedAt, t)
        );
      }
      onFocus() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        t == null || t.refetch({ cancelRefetch: !1 }),
          (n = C(this, Ne)) == null || n.continue();
      }
      onOnline() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnReconnect());
        t == null || t.refetch({ cancelRefetch: !1 }),
          (n = C(this, Ne)) == null || n.continue();
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          C(this, Ge).notify({
            type: "observerAdded",
            query: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((n) => n !== t)),
          this.observers.length ||
            (C(this, Ne) &&
              (C(this, zn)
                ? C(this, Ne).cancel({ revert: !0 })
                : C(this, Ne).cancelRetry()),
            this.scheduleGc()),
          C(this, Ge).notify({
            type: "observerRemoved",
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          $(this, ut, It).call(this, { type: "invalidate" });
      }
      fetch(t, n) {
        var a, c, d;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (C(this, Ne))
            return C(this, Ne).continueRetry(), C(this, Ne).promise;
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const m = this.observers.find((p) => p.options.queryFn);
          m && this.setOptions(m.options);
        }
        const r = new AbortController(),
          i = (m) => {
            Object.defineProperty(m, "signal", {
              enumerable: !0,
              get: () => (_(this, zn, !0), r.signal),
            });
          },
          o = () => {
            const m = im(this.options, n),
              p = { queryKey: this.queryKey, meta: this.meta };
            return (
              i(p),
              _(this, zn, !1),
              this.options.persister ? this.options.persister(m, p, this) : m(p)
            );
          },
          s = {
            fetchOptions: n,
            options: this.options,
            queryKey: this.queryKey,
            state: this.state,
            fetchFn: o,
          };
        i(s),
          (a = this.options.behavior) == null || a.onFetch(s, this),
          _(this, Pr, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !==
              ((c = s.fetchOptions) == null ? void 0 : c.meta)) &&
            $(this, ut, It).call(this, {
              type: "fetch",
              meta: (d = s.fetchOptions) == null ? void 0 : d.meta,
            });
        const l = (m) => {
          var p, v, x, w;
          (Ml(m) && m.silent) ||
            $(this, ut, It).call(this, { type: "error", error: m }),
            Ml(m) ||
              ((v = (p = C(this, Ge).config).onError) == null ||
                v.call(p, m, this),
              (w = (x = C(this, Ge).config).onSettled) == null ||
                w.call(x, this.state.data, m, this)),
            this.scheduleGc();
        };
        return (
          _(
            this,
            Ne,
            lm({
              initialPromise: n == null ? void 0 : n.initialPromise,
              fn: s.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (m) => {
                var p, v, x, w;
                if (m === void 0) {
                  l(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(m);
                } catch (E) {
                  l(E);
                  return;
                }
                (v = (p = C(this, Ge).config).onSuccess) == null ||
                  v.call(p, m, this),
                  (w = (x = C(this, Ge).config).onSettled) == null ||
                    w.call(x, m, this.state.error, this),
                  this.scheduleGc();
              },
              onError: l,
              onFail: (m, p) => {
                $(this, ut, It).call(this, {
                  type: "failed",
                  failureCount: m,
                  error: p,
                });
              },
              onPause: () => {
                $(this, ut, It).call(this, { type: "pause" });
              },
              onContinue: () => {
                $(this, ut, It).call(this, { type: "continue" });
              },
              retry: s.options.retry,
              retryDelay: s.options.retryDelay,
              networkMode: s.options.networkMode,
              canRun: () => !0,
            }),
          ),
          C(this, Ne).start()
        );
      }
    }),
    (Or = new WeakMap()),
    (Pr = new WeakMap()),
    (Ge = new WeakMap()),
    (Ne = new WeakMap()),
    (Zi = new WeakMap()),
    (zn = new WeakMap()),
    (ut = new WeakSet()),
    (It = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...um(r.data, this.options),
              fetchMeta: t.meta ?? null,
            };
          case "success":
            return {
              ...r,
              data: t.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const i = t.error;
            return Ml(i) && i.revert && C(this, Pr)
              ? { ...C(this, Pr), fetchStatus: "idle" }
              : {
                  ...r,
                  error: i,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: i,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...t.state };
        }
      };
      (this.state = n(this.state)),
        xe.batch(() => {
          this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            C(this, Ge).notify({ query: this, type: "updated", action: t });
        });
    }),
    ef);
function um(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: om(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function zx(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (r ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var St,
  tf,
  $x =
    ((tf = class extends ao {
      constructor(t = {}) {
        super();
        b(this, St);
        (this.config = t), _(this, St, new Map());
      }
      build(t, n, r) {
        const i = n.queryKey,
          o = n.queryHash ?? dc(i, n);
        let s = this.get(o);
        return (
          s ||
            ((s = new Fx({
              cache: this,
              queryKey: i,
              queryHash: o,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(i),
            })),
            this.add(s)),
          s
        );
      }
      add(t) {
        C(this, St).has(t.queryHash) ||
          (C(this, St).set(t.queryHash, t),
          this.notify({ type: "added", query: t }));
      }
      remove(t) {
        const n = C(this, St).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && C(this, St).delete(t.queryHash),
          this.notify({ type: "removed", query: t }));
      }
      clear() {
        xe.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return C(this, St).get(t);
      }
      getAll() {
        return [...C(this, St).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => Fd(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((r) => Fd(t, r)) : n;
      }
      notify(t) {
        xe.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        xe.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        xe.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (St = new WeakMap()),
    tf),
  Et,
  Te,
  $n,
  Nt,
  Yt,
  nf,
  Ux =
    ((nf = class extends am {
      constructor(t) {
        super();
        b(this, Nt);
        b(this, Et);
        b(this, Te);
        b(this, $n);
        (this.mutationId = t.mutationId),
          _(this, Te, t.mutationCache),
          _(this, Et, []),
          (this.state = t.state || Bx()),
          this.setOptions(t.options),
          this.scheduleGc();
      }
      setOptions(t) {
        (this.options = t), this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        C(this, Et).includes(t) ||
          (C(this, Et).push(t),
          this.clearGcTimeout(),
          C(this, Te).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        _(
          this,
          Et,
          C(this, Et).filter((n) => n !== t),
        ),
          this.scheduleGc(),
          C(this, Te).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          });
      }
      optionalRemove() {
        C(this, Et).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : C(this, Te).remove(this));
      }
      continue() {
        var t;
        return (
          ((t = C(this, $n)) == null ? void 0 : t.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(t) {
        var i, o, s, l, a, c, d, m, p, v, x, w, E, h, g, y, S, N, j, T;
        _(
          this,
          $n,
          lm({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (O, L) => {
              $(this, Nt, Yt).call(this, {
                type: "failed",
                failureCount: O,
                error: L,
              });
            },
            onPause: () => {
              $(this, Nt, Yt).call(this, { type: "pause" });
            },
            onContinue: () => {
              $(this, Nt, Yt).call(this, { type: "continue" });
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => C(this, Te).canRun(this),
          }),
        );
        const n = this.state.status === "pending",
          r = !C(this, $n).canStart();
        try {
          if (!n) {
            $(this, Nt, Yt).call(this, {
              type: "pending",
              variables: t,
              isPaused: r,
            }),
              await ((o = (i = C(this, Te).config).onMutate) == null
                ? void 0
                : o.call(i, t, this));
            const L = await ((l = (s = this.options).onMutate) == null
              ? void 0
              : l.call(s, t));
            L !== this.state.context &&
              $(this, Nt, Yt).call(this, {
                type: "pending",
                context: L,
                variables: t,
                isPaused: r,
              });
          }
          const O = await C(this, $n).start();
          return (
            await ((c = (a = C(this, Te).config).onSuccess) == null
              ? void 0
              : c.call(a, O, t, this.state.context, this)),
            await ((m = (d = this.options).onSuccess) == null
              ? void 0
              : m.call(d, O, t, this.state.context)),
            await ((v = (p = C(this, Te).config).onSettled) == null
              ? void 0
              : v.call(
                  p,
                  O,
                  null,
                  this.state.variables,
                  this.state.context,
                  this,
                )),
            await ((w = (x = this.options).onSettled) == null
              ? void 0
              : w.call(x, O, null, t, this.state.context)),
            $(this, Nt, Yt).call(this, { type: "success", data: O }),
            O
          );
        } catch (O) {
          try {
            throw (
              (await ((h = (E = C(this, Te).config).onError) == null
                ? void 0
                : h.call(E, O, t, this.state.context, this)),
              await ((y = (g = this.options).onError) == null
                ? void 0
                : y.call(g, O, t, this.state.context)),
              await ((N = (S = C(this, Te).config).onSettled) == null
                ? void 0
                : N.call(
                    S,
                    void 0,
                    O,
                    this.state.variables,
                    this.state.context,
                    this,
                  )),
              await ((T = (j = this.options).onSettled) == null
                ? void 0
                : T.call(j, void 0, O, t, this.state.context)),
              O)
            );
          } finally {
            $(this, Nt, Yt).call(this, { type: "error", error: O });
          }
        } finally {
          C(this, Te).runNext(this);
        }
      }
    }),
    (Et = new WeakMap()),
    (Te = new WeakMap()),
    ($n = new WeakMap()),
    (Nt = new WeakSet()),
    (Yt = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = n(this.state)),
        xe.batch(() => {
          C(this, Et).forEach((r) => {
            r.onMutationUpdate(t);
          }),
            C(this, Te).notify({ mutation: this, type: "updated", action: t });
        });
    }),
    nf);
function Bx() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var $e,
  Yi,
  rf,
  Hx =
    ((rf = class extends ao {
      constructor(t = {}) {
        super();
        b(this, $e);
        b(this, Yi);
        (this.config = t), _(this, $e, new Map()), _(this, Yi, Date.now());
      }
      build(t, n, r) {
        const i = new Ux({
          mutationCache: this,
          mutationId: ++po(this, Yi)._,
          options: t.defaultMutationOptions(n),
          state: r,
        });
        return this.add(i), i;
      }
      add(t) {
        const n = _o(t),
          r = C(this, $e).get(n) ?? [];
        r.push(t),
          C(this, $e).set(n, r),
          this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        var r;
        const n = _o(t);
        if (C(this, $e).has(n)) {
          const i =
            (r = C(this, $e).get(n)) == null
              ? void 0
              : r.filter((o) => o !== t);
          i && (i.length === 0 ? C(this, $e).delete(n) : C(this, $e).set(n, i));
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        var r;
        const n =
          (r = C(this, $e).get(_o(t))) == null
            ? void 0
            : r.find((i) => i.state.status === "pending");
        return !n || n === t;
      }
      runNext(t) {
        var r;
        const n =
          (r = C(this, $e).get(_o(t))) == null
            ? void 0
            : r.find((i) => i !== t && i.state.isPaused);
        return (n == null ? void 0 : n.continue()) ?? Promise.resolve();
      }
      clear() {
        xe.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      getAll() {
        return [...C(this, $e).values()].flat();
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => zd(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter((n) => zd(t, n));
      }
      notify(t) {
        xe.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((n) => n.state.isPaused);
        return xe.batch(() =>
          Promise.all(t.map((n) => n.continue().catch(qe))),
        );
      }
    }),
    ($e = new WeakMap()),
    (Yi = new WeakMap()),
    rf);
function _o(e) {
  var t;
  return (
    ((t = e.options.scope) == null ? void 0 : t.id) ?? String(e.mutationId)
  );
}
function Bd(e) {
  return {
    onFetch: (t, n) => {
      var d, m, p, v, x;
      const r = t.options,
        i =
          (p =
            (m = (d = t.fetchOptions) == null ? void 0 : d.meta) == null
              ? void 0
              : m.fetchMore) == null
            ? void 0
            : p.direction,
        o = ((v = t.state.data) == null ? void 0 : v.pages) || [],
        s = ((x = t.state.data) == null ? void 0 : x.pageParams) || [];
      let l = { pages: [], pageParams: [] },
        a = 0;
      const c = async () => {
        let w = !1;
        const E = (y) => {
            Object.defineProperty(y, "signal", {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (w = !0)
                  : t.signal.addEventListener("abort", () => {
                      w = !0;
                    }),
                t.signal
              ),
            });
          },
          h = im(t.options, t.fetchOptions),
          g = async (y, S, N) => {
            if (w) return Promise.reject();
            if (S == null && y.pages.length) return Promise.resolve(y);
            const j = {
              queryKey: t.queryKey,
              pageParam: S,
              direction: N ? "backward" : "forward",
              meta: t.options.meta,
            };
            E(j);
            const T = await h(j),
              { maxPages: O } = t.options,
              L = N ? Dx : Ix;
            return {
              pages: L(y.pages, T, O),
              pageParams: L(y.pageParams, S, O),
            };
          };
        if (i && o.length) {
          const y = i === "backward",
            S = y ? Vx : Hd,
            N = { pages: o, pageParams: s },
            j = S(r, N);
          l = await g(N, j, y);
        } else {
          const y = e ?? o.length;
          do {
            const S = a === 0 ? (s[0] ?? r.initialPageParam) : Hd(r, l);
            if (a > 0 && S == null) break;
            (l = await g(l, S)), a++;
          } while (a < y);
        }
        return l;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var w, E;
            return (E = (w = t.options).persister) == null
              ? void 0
              : E.call(
                  w,
                  c,
                  {
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal,
                  },
                  n,
                );
          })
        : (t.fetchFn = c);
    },
  };
}
function Hd(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function Vx(e, { pages: t, pageParams: n }) {
  var r;
  return t.length > 0
    ? (r = e.getPreviousPageParam) == null
      ? void 0
      : r.call(e, t[0], t, n[0], n)
    : void 0;
}
var ie,
  on,
  sn,
  Lr,
  Rr,
  ln,
  Ir,
  Dr,
  of,
  Qx =
    ((of = class {
      constructor(e = {}) {
        b(this, ie);
        b(this, on);
        b(this, sn);
        b(this, Lr);
        b(this, Rr);
        b(this, ln);
        b(this, Ir);
        b(this, Dr);
        _(this, ie, e.queryCache || new $x()),
          _(this, on, e.mutationCache || new Hx()),
          _(this, sn, e.defaultOptions || {}),
          _(this, Lr, new Map()),
          _(this, Rr, new Map()),
          _(this, ln, 0);
      }
      mount() {
        po(this, ln)._++,
          C(this, ln) === 1 &&
            (_(
              this,
              Ir,
              hc.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), C(this, ie).onFocus());
              }),
            ),
            _(
              this,
              Dr,
              Ls.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), C(this, ie).onOnline());
              }),
            ));
      }
      unmount() {
        var e, t;
        po(this, ln)._--,
          C(this, ln) === 0 &&
            ((e = C(this, Ir)) == null || e.call(this),
            _(this, Ir, void 0),
            (t = C(this, Dr)) == null || t.call(this),
            _(this, Dr, void 0));
      }
      isFetching(e) {
        return C(this, ie).findAll({ ...e, fetchStatus: "fetching" }).length;
      }
      isMutating(e) {
        return C(this, on).findAll({ ...e, status: "pending" }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = C(this, ie).get(t.queryHash)) == null
          ? void 0
          : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.defaultQueryOptions(e),
          n = C(this, ie).build(this, t),
          r = n.state.data;
        return r === void 0
          ? this.fetchQuery(e)
          : (e.revalidateIfStale &&
              n.isStaleByTime(Nr(t.staleTime, n)) &&
              this.prefetchQuery(t),
            Promise.resolve(r));
      }
      getQueriesData(e) {
        return C(this, ie)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          i = C(this, ie).get(r.queryHash),
          o = i == null ? void 0 : i.state.data,
          s = Lx(t, o);
        if (s !== void 0)
          return C(this, ie)
            .build(this, r)
            .setData(s, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return xe.batch(() =>
          C(this, ie)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)]),
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = C(this, ie).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = C(this, ie);
        xe.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = C(this, ie),
          r = { type: "active", ...e };
        return xe.batch(
          () => (
            n.findAll(e).forEach((i) => {
              i.reset();
            }),
            this.refetchQueries(r, t)
          ),
        );
      }
      cancelQueries(e, t = {}) {
        const n = { revert: !0, ...t },
          r = xe.batch(() =>
            C(this, ie)
              .findAll(e)
              .map((i) => i.cancel(n)),
          );
        return Promise.all(r).then(qe).catch(qe);
      }
      invalidateQueries(e, t = {}) {
        return xe.batch(() => {
          if (
            (C(this, ie)
              .findAll(e)
              .forEach((r) => {
                r.invalidate();
              }),
            (e == null ? void 0 : e.refetchType) === "none")
          )
            return Promise.resolve();
          const n = {
            ...e,
            type:
              (e == null ? void 0 : e.refetchType) ??
              (e == null ? void 0 : e.type) ??
              "active",
          };
          return this.refetchQueries(n, t);
        });
      }
      refetchQueries(e, t = {}) {
        const n = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
          r = xe.batch(() =>
            C(this, ie)
              .findAll(e)
              .filter((i) => !i.isDisabled())
              .map((i) => {
                let o = i.fetch(void 0, n);
                return (
                  n.throwOnError || (o = o.catch(qe)),
                  i.state.fetchStatus === "paused" ? Promise.resolve() : o
                );
              }),
          );
        return Promise.all(r).then(qe);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = C(this, ie).build(this, t);
        return n.isStaleByTime(Nr(t.staleTime, n))
          ? n.fetch(t)
          : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(qe).catch(qe);
      }
      fetchInfiniteQuery(e) {
        return (e.behavior = Bd(e.pages)), this.fetchQuery(e);
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(qe).catch(qe);
      }
      ensureInfiniteQueryData(e) {
        return (e.behavior = Bd(e.pages)), this.ensureQueryData(e);
      }
      resumePausedMutations() {
        return Ls.isOnline()
          ? C(this, on).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return C(this, ie);
      }
      getMutationCache() {
        return C(this, on);
      }
      getDefaultOptions() {
        return C(this, sn);
      }
      setDefaultOptions(e) {
        _(this, sn, e);
      }
      setQueryDefaults(e, t) {
        C(this, Lr).set(Wi(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...C(this, Lr).values()],
          n = {};
        return (
          t.forEach((r) => {
            Ki(e, r.queryKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        C(this, Rr).set(Wi(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...C(this, Rr).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Ki(e, r.mutationKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...C(this, sn).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = dc(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== "always"),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
          t.queryFn === fc && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...C(this, sn).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        C(this, ie).clear(), C(this, on).clear();
      }
    }),
    (ie = new WeakMap()),
    (on = new WeakMap()),
    (sn = new WeakMap()),
    (Lr = new WeakMap()),
    (Rr = new WeakMap()),
    (ln = new WeakMap()),
    (Ir = new WeakMap()),
    (Dr = new WeakMap()),
    of),
  De,
  U,
  Ji,
  Oe,
  Un,
  Ar,
  an,
  kt,
  Xi,
  _r,
  br,
  Bn,
  Hn,
  un,
  Mr,
  W,
  gi,
  Ua,
  Ba,
  Ha,
  Va,
  Qa,
  Wa,
  Ka,
  cm,
  sf,
  Wx =
    ((sf = class extends ao {
      constructor(t, n) {
        super();
        b(this, W);
        b(this, De);
        b(this, U);
        b(this, Ji);
        b(this, Oe);
        b(this, Un);
        b(this, Ar);
        b(this, an);
        b(this, kt);
        b(this, Xi);
        b(this, _r);
        b(this, br);
        b(this, Bn);
        b(this, Hn);
        b(this, un);
        b(this, Mr, new Set());
        (this.options = n),
          _(this, De, t),
          _(this, kt, null),
          _(this, an, $a()),
          this.options.experimental_prefetchInRender ||
            C(this, an).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            ),
          this.bindMethods(),
          this.setOptions(n);
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (C(this, U).addObserver(this),
          Vd(C(this, U), this.options)
            ? $(this, W, gi).call(this)
            : this.updateResult(),
          $(this, W, Va).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return Ga(C(this, U), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return Ga(C(this, U), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set()),
          $(this, W, Qa).call(this),
          $(this, W, Wa).call(this),
          C(this, U).removeObserver(this);
      }
      setOptions(t, n) {
        const r = this.options,
          i = C(this, U);
        if (
          ((this.options = C(this, De).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof ft(this.options.enabled, C(this, U)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean",
          );
        $(this, W, Ka).call(this),
          C(this, U).setOptions(this.options),
          r._defaulted &&
            !Ma(this.options, r) &&
            C(this, De)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: C(this, U),
                observer: this,
              });
        const o = this.hasListeners();
        o && Qd(C(this, U), i, this.options, r) && $(this, W, gi).call(this),
          this.updateResult(n),
          o &&
            (C(this, U) !== i ||
              ft(this.options.enabled, C(this, U)) !==
                ft(r.enabled, C(this, U)) ||
              Nr(this.options.staleTime, C(this, U)) !==
                Nr(r.staleTime, C(this, U))) &&
            $(this, W, Ua).call(this);
        const s = $(this, W, Ba).call(this);
        o &&
          (C(this, U) !== i ||
            ft(this.options.enabled, C(this, U)) !==
              ft(r.enabled, C(this, U)) ||
            s !== C(this, un)) &&
          $(this, W, Ha).call(this, s);
      }
      getOptimisticResult(t) {
        const n = C(this, De).getQueryCache().build(C(this, De), t),
          r = this.createResult(n, t);
        return (
          Gx(this, r) &&
            (_(this, Oe, r),
            _(this, Ar, this.options),
            _(this, Un, C(this, U).state)),
          r
        );
      }
      getCurrentResult() {
        return C(this, Oe);
      }
      trackResult(t, n) {
        const r = {};
        return (
          Object.keys(t).forEach((i) => {
            Object.defineProperty(r, i, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(i), n == null || n(i), t[i]),
            });
          }),
          r
        );
      }
      trackProp(t) {
        C(this, Mr).add(t);
      }
      getCurrentQuery() {
        return C(this, U);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = C(this, De).defaultQueryOptions(t),
          r = C(this, De).getQueryCache().build(C(this, De), n);
        return r.fetch().then(() => this.createResult(r, n));
      }
      fetch(t) {
        return $(this, W, gi)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), C(this, Oe)));
      }
      createResult(t, n) {
        var O;
        const r = C(this, U),
          i = this.options,
          o = C(this, Oe),
          s = C(this, Un),
          l = C(this, Ar),
          c = t !== r ? t.state : C(this, Ji),
          { state: d } = t;
        let m = { ...d },
          p = !1,
          v;
        if (n._optimisticResults) {
          const L = this.hasListeners(),
            R = !L && Vd(t, n),
            Q = L && Qd(t, r, n, i);
          (R || Q) && (m = { ...m, ...um(d.data, t.options) }),
            n._optimisticResults === "isRestoring" && (m.fetchStatus = "idle");
        }
        let { error: x, errorUpdatedAt: w, status: E } = m;
        if (n.select && m.data !== void 0)
          if (
            o &&
            m.data === (s == null ? void 0 : s.data) &&
            n.select === C(this, Xi)
          )
            v = C(this, _r);
          else
            try {
              _(this, Xi, n.select),
                (v = n.select(m.data)),
                (v = za(o == null ? void 0 : o.data, v, n)),
                _(this, _r, v),
                _(this, kt, null);
            } catch (L) {
              _(this, kt, L);
            }
        else v = m.data;
        if (n.placeholderData !== void 0 && v === void 0 && E === "pending") {
          let L;
          if (
            o != null &&
            o.isPlaceholderData &&
            n.placeholderData === (l == null ? void 0 : l.placeholderData)
          )
            L = o.data;
          else if (
            ((L =
              typeof n.placeholderData == "function"
                ? n.placeholderData(
                    (O = C(this, br)) == null ? void 0 : O.state.data,
                    C(this, br),
                  )
                : n.placeholderData),
            n.select && L !== void 0)
          )
            try {
              (L = n.select(L)), _(this, kt, null);
            } catch (R) {
              _(this, kt, R);
            }
          L !== void 0 &&
            ((E = "success"),
            (v = za(o == null ? void 0 : o.data, L, n)),
            (p = !0));
        }
        C(this, kt) &&
          ((x = C(this, kt)),
          (v = C(this, _r)),
          (w = Date.now()),
          (E = "error"));
        const h = m.fetchStatus === "fetching",
          g = E === "pending",
          y = E === "error",
          S = g && h,
          N = v !== void 0,
          T = {
            status: E,
            fetchStatus: m.fetchStatus,
            isPending: g,
            isSuccess: E === "success",
            isError: y,
            isInitialLoading: S,
            isLoading: S,
            data: v,
            dataUpdatedAt: m.dataUpdatedAt,
            error: x,
            errorUpdatedAt: w,
            failureCount: m.fetchFailureCount,
            failureReason: m.fetchFailureReason,
            errorUpdateCount: m.errorUpdateCount,
            isFetched: m.dataUpdateCount > 0 || m.errorUpdateCount > 0,
            isFetchedAfterMount:
              m.dataUpdateCount > c.dataUpdateCount ||
              m.errorUpdateCount > c.errorUpdateCount,
            isFetching: h,
            isRefetching: h && !g,
            isLoadingError: y && !N,
            isPaused: m.fetchStatus === "paused",
            isPlaceholderData: p,
            isRefetchError: y && N,
            isStale: pc(t, n),
            refetch: this.refetch,
            promise: C(this, an),
          };
        if (this.options.experimental_prefetchInRender) {
          const L = (ye) => {
              T.status === "error"
                ? ye.reject(T.error)
                : T.data !== void 0 && ye.resolve(T.data);
            },
            R = () => {
              const ye = _(this, an, (T.promise = $a()));
              L(ye);
            },
            Q = C(this, an);
          switch (Q.status) {
            case "pending":
              t.queryHash === r.queryHash && L(Q);
              break;
            case "fulfilled":
              (T.status === "error" || T.data !== Q.value) && R();
              break;
            case "rejected":
              (T.status !== "error" || T.error !== Q.reason) && R();
              break;
          }
        }
        return T;
      }
      updateResult(t) {
        const n = C(this, Oe),
          r = this.createResult(C(this, U), this.options);
        if (
          (_(this, Un, C(this, U).state),
          _(this, Ar, this.options),
          C(this, Un).data !== void 0 && _(this, br, C(this, U)),
          Ma(r, n))
        )
          return;
        _(this, Oe, r);
        const i = {},
          o = () => {
            if (!n) return !0;
            const { notifyOnChangeProps: s } = this.options,
              l = typeof s == "function" ? s() : s;
            if (l === "all" || (!l && !C(this, Mr).size)) return !0;
            const a = new Set(l ?? C(this, Mr));
            return (
              this.options.throwOnError && a.add("error"),
              Object.keys(C(this, Oe)).some((c) => {
                const d = c;
                return C(this, Oe)[d] !== n[d] && a.has(d);
              })
            );
          };
        (t == null ? void 0 : t.listeners) !== !1 && o() && (i.listeners = !0),
          $(this, W, cm).call(this, { ...i, ...t });
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && $(this, W, Va).call(this);
      }
    }),
    (De = new WeakMap()),
    (U = new WeakMap()),
    (Ji = new WeakMap()),
    (Oe = new WeakMap()),
    (Un = new WeakMap()),
    (Ar = new WeakMap()),
    (an = new WeakMap()),
    (kt = new WeakMap()),
    (Xi = new WeakMap()),
    (_r = new WeakMap()),
    (br = new WeakMap()),
    (Bn = new WeakMap()),
    (Hn = new WeakMap()),
    (un = new WeakMap()),
    (Mr = new WeakMap()),
    (W = new WeakSet()),
    (gi = function (t) {
      $(this, W, Ka).call(this);
      let n = C(this, U).fetch(this.options, t);
      return (t != null && t.throwOnError) || (n = n.catch(qe)), n;
    }),
    (Ua = function () {
      $(this, W, Qa).call(this);
      const t = Nr(this.options.staleTime, C(this, U));
      if (Yn || C(this, Oe).isStale || !ba(t)) return;
      const r = nm(C(this, Oe).dataUpdatedAt, t) + 1;
      _(
        this,
        Bn,
        setTimeout(() => {
          C(this, Oe).isStale || this.updateResult();
        }, r),
      );
    }),
    (Ba = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(C(this, U))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (Ha = function (t) {
      $(this, W, Wa).call(this),
        _(this, un, t),
        !(
          Yn ||
          ft(this.options.enabled, C(this, U)) === !1 ||
          !ba(C(this, un)) ||
          C(this, un) === 0
        ) &&
          _(
            this,
            Hn,
            setInterval(
              () => {
                (this.options.refetchIntervalInBackground || hc.isFocused()) &&
                  $(this, W, gi).call(this);
              },
              C(this, un),
            ),
          );
    }),
    (Va = function () {
      $(this, W, Ua).call(this),
        $(this, W, Ha).call(this, $(this, W, Ba).call(this));
    }),
    (Qa = function () {
      C(this, Bn) && (clearTimeout(C(this, Bn)), _(this, Bn, void 0));
    }),
    (Wa = function () {
      C(this, Hn) && (clearInterval(C(this, Hn)), _(this, Hn, void 0));
    }),
    (Ka = function () {
      const t = C(this, De).getQueryCache().build(C(this, De), this.options);
      if (t === C(this, U)) return;
      const n = C(this, U);
      _(this, U, t),
        _(this, Ji, t.state),
        this.hasListeners() &&
          (n == null || n.removeObserver(this), t.addObserver(this));
    }),
    (cm = function (t) {
      xe.batch(() => {
        t.listeners &&
          this.listeners.forEach((n) => {
            n(C(this, Oe));
          }),
          C(this, De)
            .getQueryCache()
            .notify({ query: C(this, U), type: "observerResultsUpdated" });
      });
    }),
    sf);
function Kx(e, t) {
  return (
    ft(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Vd(e, t) {
  return Kx(e, t) || (e.state.data !== void 0 && Ga(e, t, t.refetchOnMount));
}
function Ga(e, t, n) {
  if (ft(t.enabled, e) !== !1) {
    const r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && pc(e, t));
  }
  return !1;
}
function Qd(e, t, n, r) {
  return (
    (e !== t || ft(r.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    pc(e, n)
  );
}
function pc(e, t) {
  return ft(t.enabled, e) !== !1 && e.isStaleByTime(Nr(t.staleTime, e));
}
function Gx(e, t) {
  return !Ma(e.getCurrentResult(), t);
}
var dm = f.createContext(void 0),
  qx = (e) => {
    const t = f.useContext(dm);
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  Zx = ({ client: e, children: t }) => (
    f.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    u.jsx(dm.Provider, { value: e, children: t })
  ),
  fm = f.createContext(!1),
  Yx = () => f.useContext(fm);
fm.Provider;
function Jx() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var Xx = f.createContext(Jx()),
  e1 = () => f.useContext(Xx);
function t1(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
function Wd() {}
var n1 = (e, t) => {
    (e.suspense || e.throwOnError || e.experimental_prefetchInRender) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  r1 = (e) => {
    f.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  i1 = ({ result: e, errorResetBoundary: t, throwOnError: n, query: r }) =>
    e.isError && !t.isReset() && !e.isFetching && r && t1(n, [e.error, r]),
  o1 = (e) => {
    e.suspense &&
      (e.staleTime === void 0 && (e.staleTime = 1e3),
      typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
  },
  s1 = (e, t) => e.isLoading && e.isFetching && !t,
  l1 = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  Kd = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function a1(e, t, n) {
  var d, m, p, v, x;
  const r = qx(),
    i = Yx(),
    o = e1(),
    s = r.defaultQueryOptions(e);
  (m =
    (d = r.getDefaultOptions().queries) == null
      ? void 0
      : d._experimental_beforeQuery) == null || m.call(d, s),
    (s._optimisticResults = i ? "isRestoring" : "optimistic"),
    o1(s),
    n1(s, o),
    r1(o);
  const l = !r.getQueryCache().get(s.queryHash),
    [a] = f.useState(() => new t(r, s)),
    c = a.getOptimisticResult(s);
  if (
    (f.useSyncExternalStore(
      f.useCallback(
        (w) => {
          const E = i ? Wd : a.subscribe(xe.batchCalls(w));
          return a.updateResult(), E;
        },
        [a, i],
      ),
      () => a.getCurrentResult(),
      () => a.getCurrentResult(),
    ),
    f.useEffect(() => {
      a.setOptions(s, { listeners: !1 });
    }, [s, a]),
    l1(s, c))
  )
    throw Kd(s, a, o);
  if (
    i1({
      result: c,
      errorResetBoundary: o,
      throwOnError: s.throwOnError,
      query: r.getQueryCache().get(s.queryHash),
    })
  )
    throw c.error;
  if (
    ((v =
      (p = r.getDefaultOptions().queries) == null
        ? void 0
        : p._experimental_afterQuery) == null || v.call(p, s, c),
    s.experimental_prefetchInRender && !Yn && s1(c, i))
  ) {
    const w = l
      ? Kd(s, a, o)
      : (x = r.getQueryCache().get(s.queryHash)) == null
        ? void 0
        : x.promise;
    w == null ||
      w.catch(Wd).finally(() => {
        a.updateResult();
      });
  }
  return s.notifyOnChangeProps ? c : a.trackResult(c);
}
function Gi(e, t) {
  return a1(e, Wx);
}
var u1 = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var r, i, o;
    if (Array.isArray(t)) {
      if (((r = t.length), r != n.length)) return !1;
      for (i = r; i-- !== 0; ) if (!e(t[i], n[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === n.toString();
    if (((o = Object.keys(t)), (r = o.length), r !== Object.keys(n).length))
      return !1;
    for (i = r; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, o[i])) return !1;
    for (i = r; i-- !== 0; ) {
      var s = o[i];
      if (!e(t[s], n[s])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
};
const c1 = Rs(u1);
function Pt() {
  return (
    (Pt = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Pt.apply(null, arguments)
  );
}
function Wr(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.includes(r)) continue;
      n[r] = e[r];
    }
  return n;
}
function d1(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function f1(e) {
  var t = d1(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
const _t = {
    NOT_LOADED: "NOT_LOADED",
    LOADING: "LOADING",
    LOADED: "LOADED",
    FAILED: "FAILED",
    AUTH_FAILURE: "AUTH_FAILURE",
  },
  h1 = "https://maps.googleapis.com/maps/api/js";
class qi {
  static async load(t, n) {
    var r;
    const i = t.libraries ? t.libraries.split(",") : [],
      o = this.serializeParams(t);
    this.listeners.push(n),
      (r = window.google) != null && (r = r.maps) != null && r.importLibrary
        ? (this.serializedApiParams || (this.loadingStatus = _t.LOADED),
          this.notifyLoadingStatusListeners())
        : ((this.serializedApiParams = o), this.initImportLibrary(t)),
      this.serializedApiParams &&
        this.serializedApiParams !== o &&
        console.warn(
          "[google-maps-api-loader] The maps API has already been loaded with different parameters and will not be loaded again. Refresh the page for new values to have effect.",
        );
    const s = ["maps", ...i];
    await Promise.all(s.map((l) => google.maps.importLibrary(l)));
  }
  static serializeParams(t) {
    return [
      t.v,
      t.key,
      t.language,
      t.region,
      t.authReferrerPolicy,
      t.solutionChannel,
    ].join("/");
  }
  static initImportLibrary(t) {
    if (
      (window.google || (window.google = {}),
      window.google.maps || (window.google.maps = {}),
      window.google.maps.importLibrary)
    ) {
      console.error(
        "[google-maps-api-loader-internal]: initImportLibrary must only be called once",
      );
      return;
    }
    let n = null;
    const r = () =>
      n ||
      ((n = new Promise((i, o) => {
        var s;
        const l = document.createElement("script"),
          a = new URLSearchParams();
        for (const [c, d] of Object.entries(t)) {
          const m = c.replace(/[A-Z]/g, (p) => "_" + p[0].toLowerCase());
          a.set(m, String(d));
        }
        a.set("loading", "async"),
          a.set("callback", "__googleMapsCallback__"),
          (l.async = !0),
          (l.src = h1 + "?" + a.toString()),
          (l.nonce =
            ((s = document.querySelector("script[nonce]")) == null
              ? void 0
              : s.nonce) || ""),
          (l.onerror = () => {
            (this.loadingStatus = _t.FAILED),
              this.notifyLoadingStatusListeners(),
              o(new Error("The Google Maps JavaScript API could not load."));
          }),
          (window.__googleMapsCallback__ = () => {
            (this.loadingStatus = _t.LOADED),
              this.notifyLoadingStatusListeners(),
              i();
          }),
          (window.gm_authFailure = () => {
            (this.loadingStatus = _t.AUTH_FAILURE),
              this.notifyLoadingStatusListeners();
          }),
          (this.loadingStatus = _t.LOADING),
          this.notifyLoadingStatusListeners(),
          document.head.append(l);
      })),
      n);
    google.maps.importLibrary = (i) =>
      r().then(() => google.maps.importLibrary(i));
  }
  static notifyLoadingStatusListeners() {
    for (const t of this.listeners) t(this.loadingStatus);
  }
}
qi.loadingStatus = _t.NOT_LOADED;
qi.serializedApiParams = void 0;
qi.listeners = [];
const p1 = ["onLoad", "onError", "apiKey", "version", "libraries"],
  m1 = ["children"],
  g1 = "GMP_visgl_rgmlibrary_v1_default",
  uo = A.createContext(null);
function y1() {
  const [e, t] = f.useState({});
  return {
    mapInstances: e,
    addMapInstance: (o, s = "default") => {
      t((l) => Pt({}, l, { [s]: o }));
    },
    removeMapInstance: (o = "default") => {
      t((s) => Wr(s, [o].map(f1)));
    },
    clearMapInstances: () => {
      t({});
    },
  };
}
function v1(e) {
  const { onLoad: t, onError: n, apiKey: r, version: i, libraries: o = [] } = e,
    s = Wr(e, p1),
    [l, a] = f.useState(qi.loadingStatus),
    [c, d] = f.useReducer(
      (x, w) => (x[w.name] ? x : Pt({}, x, { [w.name]: w.value })),
      {},
    ),
    m = f.useMemo(() => (o == null ? void 0 : o.join(",")), [o]),
    p = f.useMemo(
      () => JSON.stringify(Pt({ apiKey: r, version: i }, s)),
      [r, i, s],
    ),
    v = f.useCallback(
      async (x) => {
        var w;
        if (c[x]) return c[x];
        if (!((w = google) != null && (w = w.maps) != null && w.importLibrary))
          throw new Error(
            "[api-provider-internal] importLibrary was called before google.maps.importLibrary was defined.",
          );
        const E = await window.google.maps.importLibrary(x);
        return d({ name: x, value: E }), E;
      },
      [c],
    );
  return (
    f.useEffect(() => {
      (async () => {
        try {
          const x = Pt({ key: r }, s);
          i && (x.v = i),
            (m == null ? void 0 : m.length) > 0 && (x.libraries = m),
            (x.channel === void 0 || x.channel < 0 || x.channel > 999) &&
              delete x.channel,
            x.solutionChannel === void 0
              ? (x.solutionChannel = g1)
              : x.solutionChannel === "" && delete x.solutionChannel,
            await qi.load(x, (w) => a(w));
          for (const w of ["core", "maps", ...o]) await v(w);
          t && t();
        } catch (x) {
          n
            ? n(x)
            : console.error(
                "<ApiProvider> failed to load the Google Maps JavaScript API",
                x,
              );
        }
      })();
    }, [r, m, p]),
    { status: l, loadedLibraries: c, importLibrary: v }
  );
}
const x1 = (e) => {
  const { children: t } = e,
    n = Wr(e, m1),
    {
      mapInstances: r,
      addMapInstance: i,
      removeMapInstance: o,
      clearMapInstances: s,
    } = y1(),
    { status: l, loadedLibraries: a, importLibrary: c } = v1(n),
    d = f.useMemo(
      () => ({
        mapInstances: r,
        addMapInstance: i,
        removeMapInstance: o,
        clearMapInstances: s,
        status: l,
        loadedLibraries: a,
        importLibrary: c,
      }),
      [r, i, o, s, l, a, c],
    );
  return A.createElement(uo.Provider, { value: d }, t);
};
function w1(e, t) {
  for (const n of N1) {
    const r = t[n],
      i = hm[n];
    f.useEffect(() => {
      if (!e || !r) return;
      const o = google.maps.event.addListener(e, i, (s) => {
        r(C1(i, e, s));
      });
      return () => o.remove();
    }, [e, i, r]);
  }
}
function C1(e, t, n) {
  const r = { type: e, map: t, detail: {}, stoppable: !1, stop: () => {} };
  if (S1.includes(e)) {
    const o = r,
      s = t.getCenter(),
      l = t.getZoom(),
      a = t.getHeading() || 0,
      c = t.getTilt() || 0,
      d = t.getBounds();
    return (
      (!s || !d || !Number.isFinite(l)) &&
        console.warn(
          "[createEvent] at least one of the values from the map returned undefined. This is not expected to happen. Please report an issue at https://github.com/visgl/react-google-maps/issues/new",
        ),
      (o.detail = {
        center: (s == null ? void 0 : s.toJSON()) || { lat: 0, lng: 0 },
        zoom: l || 0,
        heading: a,
        tilt: c,
        bounds: (d == null ? void 0 : d.toJSON()) || {
          north: 90,
          east: 180,
          south: -90,
          west: -180,
        },
      }),
      o
    );
  } else if (E1.includes(e)) {
    var i;
    if (!n)
      throw new Error("[createEvent] mouse events must provide a srcEvent");
    const o = r;
    return (
      (o.domEvent = n.domEvent),
      (o.stoppable = !0),
      (o.stop = () => n.stop()),
      (o.detail = {
        latLng: ((i = n.latLng) == null ? void 0 : i.toJSON()) || null,
        placeId: n.placeId,
      }),
      o
    );
  }
  return r;
}
const hm = {
    onBoundsChanged: "bounds_changed",
    onCenterChanged: "center_changed",
    onClick: "click",
    onContextmenu: "contextmenu",
    onDblclick: "dblclick",
    onDrag: "drag",
    onDragend: "dragend",
    onDragstart: "dragstart",
    onHeadingChanged: "heading_changed",
    onIdle: "idle",
    onIsFractionalZoomEnabledChanged: "isfractionalzoomenabled_changed",
    onMapCapabilitiesChanged: "mapcapabilities_changed",
    onMapTypeIdChanged: "maptypeid_changed",
    onMousemove: "mousemove",
    onMouseout: "mouseout",
    onMouseover: "mouseover",
    onProjectionChanged: "projection_changed",
    onRenderingTypeChanged: "renderingtype_changed",
    onTilesLoaded: "tilesloaded",
    onTiltChanged: "tilt_changed",
    onZoomChanged: "zoom_changed",
    onCameraChanged: "bounds_changed",
  },
  S1 = [
    "bounds_changed",
    "center_changed",
    "heading_changed",
    "tilt_changed",
    "zoom_changed",
  ],
  E1 = [
    "click",
    "contextmenu",
    "dblclick",
    "mousemove",
    "mouseout",
    "mouseover",
  ],
  N1 = Object.keys(hm);
function k1(e, t) {
  const n = f.useRef(void 0);
  (!n.current || !c1(t, n.current)) && (n.current = t),
    f.useEffect(e, n.current);
}
const j1 = new Set([
  "backgroundColor",
  "clickableIcons",
  "controlSize",
  "disableDefaultUI",
  "disableDoubleClickZoom",
  "draggable",
  "draggableCursor",
  "draggingCursor",
  "fullscreenControl",
  "fullscreenControlOptions",
  "gestureHandling",
  "headingInteractionEnabled",
  "isFractionalZoomEnabled",
  "keyboardShortcuts",
  "mapTypeControl",
  "mapTypeControlOptions",
  "mapTypeId",
  "maxZoom",
  "minZoom",
  "noClear",
  "panControl",
  "panControlOptions",
  "restriction",
  "rotateControl",
  "rotateControlOptions",
  "scaleControl",
  "scaleControlOptions",
  "scrollwheel",
  "streetView",
  "streetViewControl",
  "streetViewControlOptions",
  "styles",
  "tiltInteractionEnabled",
  "zoomControl",
  "zoomControlOptions",
]);
function T1(e, t) {
  const n = {},
    r = Object.keys(t);
  for (const i of r) j1.has(i) && (n[i] = t[i]);
  k1(() => {
    e && e.setOptions(n);
  }, [n]);
}
function pm() {
  var e;
  return ((e = f.useContext(uo)) == null ? void 0 : e.status) || _t.NOT_LOADED;
}
function O1(e, t) {
  const { viewport: n, viewState: r } = t,
    i = !!n;
  return (
    f.useLayoutEffect(() => {
      if (!e || !r) return;
      const { latitude: o, longitude: s, bearing: l, pitch: a, zoom: c } = r;
      e.moveCamera({
        center: { lat: o, lng: s },
        heading: l,
        tilt: a,
        zoom: c + 1,
      });
    }, [e, r]),
    i
  );
}
function P1(e) {
  return !e || typeof e != "object" || !("lat" in e && "lng" in e)
    ? !1
    : Number.isFinite(e.lat) && Number.isFinite(e.lng);
}
function mm(e) {
  return P1(e) ? e : e.toJSON();
}
function L1(e, t, n) {
  const r = n.center ? mm(n.center) : null;
  let i = null,
    o = null;
  r &&
    Number.isFinite(r.lat) &&
    Number.isFinite(r.lng) &&
    ((i = r.lat), (o = r.lng));
  const s = Number.isFinite(n.zoom) ? n.zoom : null,
    l = Number.isFinite(n.heading) ? n.heading : null,
    a = Number.isFinite(n.tilt) ? n.tilt : null;
  f.useLayoutEffect(() => {
    if (!e) return;
    const c = {};
    let d = !1;
    i !== null &&
      o !== null &&
      (t.current.center.lat !== i || t.current.center.lng !== o) &&
      ((c.center = { lat: i, lng: o }), (d = !0)),
      s !== null && t.current.zoom !== s && ((c.zoom = s), (d = !0)),
      l !== null && t.current.heading !== l && ((c.heading = l), (d = !0)),
      a !== null && t.current.tilt !== a && ((c.tilt = a), (d = !0)),
      d && e.moveCamera(c);
  });
}
const R1 = () => {
  const e = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    display: "flex",
    flexFlow: "column nowrap",
    textAlign: "center",
    justifyContent: "center",
    fontSize: ".8rem",
    color: "rgba(0,0,0,0.6)",
    background: "#dddddd",
    padding: "1rem 1.5rem",
  };
  return A.createElement(
    "div",
    { style: e },
    A.createElement("h2", null, "Error: AuthFailure"),
    A.createElement(
      "p",
      null,
      "A problem with your API key prevents the map from rendering correctly. Please make sure the value of the ",
      A.createElement("code", null, "APIProvider.apiKey"),
      " prop is correct. Check the error-message in the console for further details.",
    ),
  );
};
function I1() {
  const [e, t] = f.useState(null),
    n = f.useCallback((r) => t(r), [t]);
  return [e, n];
}
function gm() {
  return pm() === _t.LOADED;
}
function D1() {
  const [, e] = f.useReducer((t) => t + 1, 0);
  return e;
}
function A1(e, t) {
  const n = e.getCenter(),
    r = e.getZoom(),
    i = e.getHeading() || 0,
    o = e.getTilt() || 0,
    s = e.getBounds();
  (!n || !s || !Number.isFinite(r)) &&
    console.warn(
      "[useTrackedCameraState] at least one of the values from the map returned undefined. This is not expected to happen. Please report an issue at https://github.com/visgl/react-google-maps/issues/new",
    ),
    Object.assign(t.current, {
      center: (n == null ? void 0 : n.toJSON()) || { lat: 0, lng: 0 },
      zoom: r || 0,
      heading: i,
      tilt: o,
    });
}
function _1(e) {
  const t = D1(),
    n = f.useRef({ center: { lat: 0, lng: 0 }, heading: 0, tilt: 0, zoom: 0 });
  return (
    f.useEffect(() => {
      if (!e) return;
      const r = google.maps.event.addListener(e, "bounds_changed", () => {
        A1(e, n), t();
      });
      return () => r.remove();
    }, [e, t]),
    n
  );
}
const b1 = [
    "id",
    "defaultBounds",
    "defaultCenter",
    "defaultZoom",
    "defaultHeading",
    "defaultTilt",
    "reuseMaps",
    "renderingType",
    "colorScheme",
  ],
  M1 = ["padding"];
class Jo {
  static has(t) {
    return this.entries[t] && this.entries[t].length > 0;
  }
  static pop(t) {
    return (this.entries[t] && this.entries[t].pop()) || null;
  }
  static push(t, n) {
    this.entries[t] || (this.entries[t] = []), this.entries[t].push(n);
  }
}
Jo.entries = {};
function F1(e, t) {
  const n = gm(),
    [r, i] = f.useState(null),
    [o, s] = I1(),
    l = _1(r),
    {
      id: a,
      defaultBounds: c,
      defaultCenter: d,
      defaultZoom: m,
      defaultHeading: p,
      defaultTilt: v,
      reuseMaps: x,
      renderingType: w,
      colorScheme: E,
    } = e,
    h = Wr(e, b1),
    g = e.zoom !== void 0 || e.defaultZoom !== void 0,
    y = e.center !== void 0 || e.defaultCenter !== void 0;
  !c &&
    (!g || !y) &&
    console.warn(
      "<Map> component is missing configuration. You have to provide zoom and center (via the `zoom`/`defaultZoom` and `center`/`defaultCenter` props) or specify the region to show using `defaultBounds`. See https://visgl.github.io/react-google-maps/docs/api-reference/components/map#required",
    ),
    !h.center && d && (h.center = d),
    !h.zoom && Number.isFinite(m) && (h.zoom = m),
    !h.heading && Number.isFinite(p) && (h.heading = p),
    !h.tilt && Number.isFinite(v) && (h.tilt = v);
  for (const N of Object.keys(h)) h[N] === void 0 && delete h[N];
  const S = f.useRef();
  return (
    f.useEffect(() => {
      if (!o || !n) return;
      const { addMapInstance: N, removeMapInstance: j } = t,
        { mapId: T } = e,
        O = `${T || "default"}:${w || "default"}:${E || "LIGHT"}`;
      let L, R;
      if (
        (x && Jo.has(O)
          ? ((R = Jo.pop(O)),
            (L = R.getDiv()),
            o.appendChild(L),
            R.setOptions(h),
            setTimeout(() => R.setCenter(R.getCenter()), 0))
          : ((L = document.createElement("div")),
            (L.style.height = "100%"),
            o.appendChild(L),
            (R = new google.maps.Map(
              L,
              Pt(
                {},
                h,
                w ? { renderingType: w } : {},
                E ? { colorScheme: E } : {},
              ),
            ))),
        i(R),
        N(R, a),
        c)
      ) {
        const { padding: Q } = c,
          ye = Wr(c, M1);
        R.fitBounds(ye, Q);
      } else
        (!g || !y) &&
          R.fitBounds({ east: 180, west: -180, south: -90, north: 90 });
      if (S.current) {
        const { mapId: Q, cameraState: ye } = S.current;
        Q !== T && R.setOptions(ye);
      }
      return () => {
        (S.current = { mapId: T, cameraState: l.current }),
          L.remove(),
          x ? Jo.push(O, R) : google.maps.event.clearInstanceListeners(R),
          i(null),
          j(a);
      };
    }, [o, n, a, e.mapId, e.renderingType, e.colorScheme]),
    [r, s, l]
  );
}
const ym = A.createContext(null),
  vm = (e) => {
    const { children: t, id: n, className: r, style: i } = e,
      o = f.useContext(uo),
      s = pm();
    if (!o)
      throw new Error(
        "<Map> can only be used inside an <ApiProvider> component.",
      );
    const [l, a, c] = F1(e, o);
    L1(l, c, e), w1(l, e), T1(l, e);
    const d = O1(l, e),
      m = !!e.controlled;
    f.useEffect(() => {
      if (l)
        return (
          d && l.setOptions({ disableDefaultUI: !0 }),
          (d || m) &&
            l.setOptions({ gestureHandling: "none", keyboardShortcuts: !1 }),
          () => {
            l.setOptions({
              gestureHandling: e.gestureHandling,
              keyboardShortcuts: e.keyboardShortcuts,
            });
          }
        );
    }, [l, d, m, e.gestureHandling, e.keyboardShortcuts]);
    const p = e.center ? mm(e.center) : null;
    let v = null,
      x = null;
    p &&
      Number.isFinite(p.lat) &&
      Number.isFinite(p.lng) &&
      ((v = p.lat), (x = p.lng));
    const w = f.useMemo(() => {
      var g, y, S, N, j;
      return {
        center: { lat: (g = v) != null ? g : 0, lng: (y = x) != null ? y : 0 },
        zoom: (S = e.zoom) != null ? S : 0,
        heading: (N = e.heading) != null ? N : 0,
        tilt: (j = e.tilt) != null ? j : 0,
      };
    }, [v, x, e.zoom, e.heading, e.tilt]);
    f.useLayoutEffect(() => {
      if (!l || !m) return;
      l.moveCamera(w);
      const g = l.addListener("bounds_changed", () => {
        l.moveCamera(w);
      });
      return () => g.remove();
    }, [l, m, w]);
    const E = f.useMemo(
        () =>
          Pt(
            {
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: d ? -1 : 0,
            },
            i,
          ),
        [i, d],
      ),
      h = f.useMemo(() => ({ map: l }), [l]);
    return s === _t.AUTH_FAILURE
      ? A.createElement(
          "div",
          { style: Pt({ position: "relative" }, r ? {} : E), className: r },
          A.createElement(R1, null),
        )
      : A.createElement(
          "div",
          Pt(
            {
              ref: a,
              "data-testid": "map",
              style: r ? void 0 : E,
              className: r,
            },
            n ? { id: n } : {},
          ),
          l ? A.createElement(ym.Provider, { value: h }, t) : null,
        );
  };
vm.deckGLViewProps = !0;
const Gd = new Set();
function z1(...e) {
  const t = JSON.stringify(e);
  Gd.has(t) || (Gd.add(t), console.error(...e));
}
const mc = (e = null) => {
  const t = f.useContext(uo),
    { map: n } = f.useContext(ym) || {};
  if (t === null)
    return (
      z1(
        "useMap(): failed to retrieve APIProviderContext. Make sure that the <APIProvider> component exists and that the component you are calling `useMap()` from is a sibling of the <APIProvider>.",
      ),
      null
    );
  const { mapInstances: r } = t;
  return e !== null ? r[e] || null : n || r.default || null;
};
function xm(e) {
  const t = gm(),
    n = f.useContext(uo);
  return (
    f.useEffect(() => {
      !t || !n || n.importLibrary(e);
    }, [t, n, e]),
    (n == null ? void 0 : n.loadedLibraries[e]) || null
  );
}
function bo(e, t, n) {
  f.useEffect(() => {
    if (!e || !t || !n) return;
    const r = google.maps.event.addListener(e, t, n);
    return () => r.remove();
  }, [e, t, n]);
}
function Mo(e, t, n) {
  f.useEffect(() => {
    e && (e[t] = n);
  }, [e, t, n]);
}
function qd(e, t, n) {
  f.useEffect(() => {
    if (!(!e || !t || !n))
      return e.addEventListener(t, n), () => e.removeEventListener(t, n);
  }, [e, t, n]);
}
function $1(e) {
  return e.nodeType === Node.ELEMENT_NODE;
}
const U1 = A.createContext(null),
  B1 = {
    TOP_LEFT: ["0%", "0%"],
    TOP_CENTER: ["50%", "0%"],
    TOP: ["50%", "0%"],
    TOP_RIGHT: ["100%", "0%"],
    LEFT_CENTER: ["0%", "50%"],
    LEFT_TOP: ["0%", "0%"],
    LEFT: ["0%", "50%"],
    LEFT_BOTTOM: ["0%", "100%"],
    RIGHT_TOP: ["100%", "0%"],
    RIGHT: ["100%", "50%"],
    RIGHT_CENTER: ["100%", "50%"],
    RIGHT_BOTTOM: ["100%", "100%"],
    BOTTOM_LEFT: ["0%", "100%"],
    BOTTOM_CENTER: ["50%", "100%"],
    BOTTOM: ["50%", "100%"],
    BOTTOM_RIGHT: ["100%", "100%"],
    CENTER: ["50%", "50%"],
  },
  H1 = ({ children: e, styles: t, className: n, anchorPoint: r }) => {
    const [i, o] = r ?? B1.BOTTOM,
      s = `translate(50%, 100%) translate(-${i}, -${o})`;
    return A.createElement(
      "div",
      { style: { transform: s } },
      A.createElement("div", { className: n, style: t }, e),
    );
  };
function V1(e) {
  const [t, n] = f.useState(null),
    [r, i] = f.useState(null),
    o = mc(),
    s = xm("marker"),
    {
      children: l,
      onClick: a,
      className: c,
      onMouseEnter: d,
      onMouseLeave: m,
      onDrag: p,
      onDragStart: v,
      onDragEnd: x,
      collisionBehavior: w,
      clickable: E,
      draggable: h,
      position: g,
      title: y,
      zIndex: S,
    } = e,
    N = f.Children.count(l);
  return (
    f.useEffect(() => {
      if (!o || !s) return;
      const j = new s.AdvancedMarkerElement();
      (j.map = o), n(j);
      let T = null;
      return (
        N > 0 &&
          ((T = document.createElement("div")),
          (T.isCustomMarker = !0),
          (j.content = T),
          i(T)),
        () => {
          var O;
          (j.map = null), (O = T) == null || O.remove(), n(null), i(null);
        }
      );
    }, [o, s, N]),
    f.useEffect(() => {
      !t || !t.content || N > 0 || (t.content.className = c || "");
    }, [t, c, N]),
    Mo(t, "position", g),
    Mo(t, "title", y ?? ""),
    Mo(t, "zIndex", S),
    Mo(t, "collisionBehavior", w),
    f.useEffect(() => {
      t &&
        (h !== void 0
          ? (t.gmpDraggable = h)
          : p || v || x
            ? (t.gmpDraggable = !0)
            : (t.gmpDraggable = !1));
    }, [t, h, p, x, v]),
    f.useEffect(() => {
      if (!t) return;
      const j = E !== void 0 || !!a || !!d || !!m;
      (t.gmpClickable = j),
        j &&
          t != null &&
          t.content &&
          $1(t.content) &&
          ((t.content.style.pointerEvents = "none"),
          t.content.firstElementChild &&
            (t.content.firstElementChild.style.pointerEvents = "all"));
    }, [t, E, a, d, m]),
    bo(t, "click", a),
    bo(t, "drag", p),
    bo(t, "dragstart", v),
    bo(t, "dragend", x),
    qd(t == null ? void 0 : t.element, "mouseenter", d),
    qd(t == null ? void 0 : t.element, "mouseleave", m),
    [t, r]
  );
}
f.forwardRef((e, t) => {
  const { children: n, style: r, className: i, anchorPoint: o } = e,
    [s, l] = V1(e),
    a = f.useMemo(() => (s ? { marker: s } : null), [s]);
  return (
    f.useImperativeHandle(t, () => s, [s]),
    l
      ? A.createElement(
          U1.Provider,
          { value: a },
          Gs.createPortal(
            A.createElement(H1, { anchorPoint: o, styles: r, className: i }, n),
            l,
          ),
        )
      : null
  );
});
const Q1 = [
  "onClick",
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "onMouseOver",
  "onMouseOut",
];
function W1(e) {
  const [t, n] = f.useState(null),
    r = mc(),
    {
      onClick: i,
      onDrag: o,
      onDragStart: s,
      onDragEnd: l,
      onMouseOver: a,
      onMouseOut: c,
    } = e,
    d = Wr(e, Q1),
    { position: m, draggable: p } = d;
  return (
    f.useEffect(() => {
      if (!r) {
        r === void 0 &&
          console.error("<Marker> has to be inside a Map component.");
        return;
      }
      const v = new google.maps.Marker(d);
      return (
        v.setMap(r),
        n(v),
        () => {
          v.setMap(null), n(null);
        }
      );
    }, [r]),
    f.useEffect(() => {
      if (!t) return;
      const v = t,
        x = google.maps.event;
      return (
        i && x.addListener(v, "click", i),
        o && x.addListener(v, "drag", o),
        s && x.addListener(v, "dragstart", s),
        l && x.addListener(v, "dragend", l),
        a && x.addListener(v, "mouseover", a),
        c && x.addListener(v, "mouseout", c),
        t.setDraggable(!!p),
        () => {
          x.clearInstanceListeners(v);
        }
      );
    }, [t, p, i, o, s, l, a, c]),
    f.useEffect(() => {
      t && d && t.setOptions(d);
    }, [t, d]),
    f.useEffect(() => {
      p || !m || !t || t.setPosition(m);
    }, [p, m, t]),
    t
  );
}
f.forwardRef((e, t) => {
  const n = W1(e);
  return (
    f.useImperativeHandle(t, () => n, [n]), A.createElement(A.Fragment, null)
  );
});
function K1() {
  const { locationId: e } = Xr(),
    { data: t, isLoading: n } = Gi({
      queryFn: () => em(e || ""),
      queryKey: ["location", { locationId: e }],
    });
  if (n)
    return u.jsx("div", {
      className: "w-full h-full flex justify-center align-center",
      children: u.jsx(Lt, { className: "" }),
    });
  const r = (i) =>
    i
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: !0,
        }).format(new Date(i))
      : null;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(Ke, {
        title: (t == null ? void 0 : t.name) || "God knows",
        leftButtons: [{ children: "BACK", onClick: () => {} }],
        buttons: [
          { children: "SHARE", onClick: () => {} },
          { children: "EDIT LOCATION", onClick: () => {} },
        ],
      }),
      u.jsxs(yt, {
        className: "p-4",
        children: [
          (t == null ? void 0 : t.notes) &&
            u.jsxs("p", {
              children: [u.jsx("strong", { children: "Notes:" }), " ", t.notes],
            }),
          (t == null ? void 0 : t.name) &&
            u.jsxs("p", {
              children: [u.jsx("strong", { children: "Name:" }), " ", t.name],
            }),
          (t == null ? void 0 : t.locationType) &&
            u.jsxs("p", {
              children: [
                u.jsx("strong", { children: "Type:" }),
                " ",
                t.locationType,
              ],
            }),
          (t == null ? void 0 : t.uploadedAt) &&
            u.jsxs("p", {
              children: [
                u.jsx("strong", { children: "Uploaded At:" }),
                " ",
                r(t.uploadedAt),
              ],
            }),
          (t == null ? void 0 : t.lastUpdated) &&
            u.jsxs("p", {
              children: [
                u.jsx("strong", { children: "Last Updated:" }),
                " ",
                r(t.lastUpdated),
              ],
            }),
        ],
      }),
      u.jsx("div", {
        className: "overflow-hidden rounded w-full h-[600px]",
        children: u.jsx(vm, {
          disableDefaultUI: !0,
          defaultZoom: 9,
          defaultCenter: { lng: 35.34, lat: 0 },
          children: u.jsx(G1, { radius: 50, opacity: 0.5 }),
        }),
      }),
    ],
  });
}
function G1({ radius: e, opacity: t }) {
  const n = mc(),
    r = xm("visualization"),
    i = f.useMemo(
      () =>
        !r || !n
          ? null
          : new google.maps.visualization.HeatmapLayer({
              map: n,
              radius: e,
              opacity: t,
            }),
      [r, n, e, t],
    );
  return (
    f.useEffect(() => {
      i &&
        i.setData([
          { location: new google.maps.LatLng(100, 100), weight: 0.1 },
          { location: new google.maps.LatLng(0, 35.3401), weight: 1.5 },
          { location: new google.maps.LatLng(0, 35.3402), weight: 0.5 },
          { location: new google.maps.LatLng(0, 35.3403), weight: 0.1 },
          { location: new google.maps.LatLng(0, 35.3404), weight: 1.1 },
        ]);
    }, [i]),
    f.useEffect(
      () => () => {
        i && i.setMap(null);
      },
      [i],
    ),
    null
  );
}
async function q1() {
  return ot(`${ei}/my-contacts`, { method: "GET", authenticate: !0 });
}
async function Z1(e, t) {
  const n = { ...e, assocLocationIds: t };
  return ot(`${ei}`, {
    method: "POST",
    authenticate: !0,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n),
  });
}
async function wm(e) {
  return ot(`${ei}/${e}`, { method: "GET", authenticate: !0 });
}
async function Y1(e) {
  return ot(`${ei}/${e}/locations`, { method: "GET", authenticate: !0 });
}
async function J1(e, t) {
  return ot(`${ei}/${e}`, {
    method: "PUT",
    authenticate: !0,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t),
  });
}
async function X1(e) {
  const t = it();
  if (
    !(
      await fetch(`${ei}/${e}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${t}` },
      })
    ).ok
  )
    throw new Error(`Failed to delete contact with id ${e}`);
}
function Zd() {
  const [e, t] = f.useState([]),
    [n, r] = f.useState(!0),
    [i, o] = f.useState(null),
    s = ze();
  f.useEffect(() => {
    (async () => {
      try {
        const d = await q1();
        t(d);
      } catch (d) {
        o("Failed to fetch contacts."),
          console.error(d),
          d === "Unauthorized" && cc(s);
      } finally {
        r(!1);
      }
    })();
  }, [s]);
  const l = e.map((c) => ({
      name: c.name,
      telNum: c.phone,
      email: c.email,
      locationId: "",
    })),
    a = async (c) => {
      const d = e[c];
      if (!(!d || !d.contactId))
        try {
          await X1(d.contactId), t((m) => m.filter((p, v) => v !== c));
        } catch (m) {
          console.error("Failed to delete contact:", m),
            o("Failed to delete contact.");
        }
    };
  return n
    ? u.jsx("div", { children: "Loading..." })
    : i
      ? u.jsx("div", { children: i })
      : u.jsxs(u.Fragment, {
          children: [
            u.jsx(Ke, {
              title: "Contacts",
              buttons: [
                {
                  children: "NEW CONTACT",
                  onClick: () => {
                    s("add");
                  },
                },
              ],
            }),
            u.jsx(Bp, {
              data: l,
              columnNames: {
                name: "Name",
                telNum: "Phone",
                email: "Email",
                locationId: "Locations",
              },
              actions: {
                Delete: a,
                Edit: (c) => {
                  const d = e[c];
                  d != null &&
                    d.contactId &&
                    s(`${ae.EDIT_CONTACT}/${String(d.contactId)}`);
                },
              },
              onRowClick: (c) => {
                const d = e[c];
                d != null && d.contactId && s(`${d.contactId}`);
              },
            }),
          ],
        });
}
function ew() {
  const e = ze(),
    [t, n] = f.useState({
      name: "",
      phone: "",
      email: "",
      notes: "",
      description: "",
      uploadedById: "mock-user-id",
      locationIds: [],
    }),
    [r, i] = f.useState([]),
    [o, s] = f.useState(""),
    [l, a] = f.useState([]),
    [c, d] = f.useState(!1),
    [m, p] = f.useState(!1),
    v = ["name", "phone", "email", "notes"];
  f.useEffect(() => {
    async function y() {
      try {
        const S = await tm();
        Array.isArray(S)
          ? a(S)
          : console.error("Returned locations is not an array:", S);
      } catch (S) {
        console.error("Failed to fetch locations:", S);
      }
    }
    y();
  }, []);
  const x = (y) => {
      const S = y.target.name,
        N = y.target.value;
      n((j) => ({ ...j, [S]: N }));
    },
    w = (y) => {
      s(y.target.value);
    },
    E = () => {
      if (!o) return;
      const y = l.find((S) => S.locationId === o);
      y &&
        y.locationId &&
        !r.some((S) => S.locationId === y.locationId) &&
        (i((S) => [...S, y]),
        n((S) => ({ ...S, locationIds: [...S.locationIds, y.locationId] })),
        s(""));
    },
    h = (y) => {
      i((S) => S.filter((N) => N.locationId !== y)),
        n((S) => ({ ...S, locationIds: S.locationIds.filter((N) => N !== y) }));
    },
    g = async (y) => {
      y.preventDefault(), d(!0);
      const S = new Date().toISOString(),
        N = {
          ...t,
          uploadedAt: S,
          lastUpdated: S,
          nonFilmingIds: [],
          assocLocationIds: t.locationIds,
        };
      try {
        await Z1(N, t.locationIds),
          p(!0),
          setTimeout(() => {
            e(B.CONTACTS);
          }, 2e3);
      } catch (j) {
        console.error("Failed to create contact:", j);
      } finally {
        d(!1);
      }
    };
  return u.jsxs("div", {
    className: "p-6 space-y-6",
    children: [
      u.jsx(Ke, { title: "Add New Contact" }),
      u.jsxs("div", {
        className: "bg-white shadow-lg rounded-2xl p-6",
        children: [
          m &&
            u.jsx("div", {
              className:
                "mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded",
              children: "Contact added successfully! Redirecting...",
            }),
          u.jsxs("form", {
            onSubmit: g,
            className: "space-y-4",
            children: [
              v.map((y) =>
                u.jsxs(
                  "div",
                  {
                    children: [
                      u.jsxs("label", {
                        className: "block text-gray-700 font-medium mb-1",
                        children: [y[0].toUpperCase() + y.slice(1), ":"],
                      }),
                      u.jsx("input", {
                        type: y === "email" ? "email" : "text",
                        name: y,
                        value: t[y],
                        onChange: x,
                        required: !0,
                        disabled: c,
                        className:
                          "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                      }),
                    ],
                  },
                  y,
                ),
              ),
              u.jsxs("div", {
                children: [
                  u.jsx("label", {
                    className: "block text-gray-700 font-medium mb-1",
                    children: "Description:",
                  }),
                  u.jsx("textarea", {
                    name: "description",
                    value: t.description,
                    onChange: x,
                    rows: 3,
                    disabled: c,
                    className:
                      "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                  }),
                ],
              }),
              u.jsx("button", {
                type: "submit",
                disabled: c,
                className: `px-4 py-2 rounded-lg shadow text-white ${c ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`,
                children: c ? "Adding..." : "Add Contact",
              }),
            ],
          }),
        ],
      }),
      u.jsxs("div", {
        className: "bg-gray-100 shadow-lg rounded-2xl p-6 mt-6",
        children: [
          u.jsx("h3", {
            className: "text-xl font-semibold mb-2",
            children: "Location Information",
          }),
          u.jsxs("div", {
            className: "mb-4",
            children: [
              u.jsx("label", {
                htmlFor: "location",
                className: "block text-sm font-medium text-gray-700",
                children: "Select Location",
              }),
              u.jsxs("select", {
                id: "location",
                className:
                  "mt-1 block w-full p-2 border border-gray-300 rounded-md",
                onChange: w,
                value: o,
                disabled: c,
                children: [
                  u.jsx("option", {
                    value: "",
                    children: "-- Choose a location --",
                  }),
                  l.map((y) =>
                    u.jsx(
                      "option",
                      { value: y.locationId, children: y.name },
                      y.locationId,
                    ),
                  ),
                ],
              }),
            ],
          }),
          u.jsx("button", {
            className:
              "bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 disabled:opacity-50",
            onClick: E,
            disabled: !o || c,
            type: "button",
            children: "Add Location",
          }),
          r.length > 0 &&
            u.jsxs("div", {
              className: "mt-6",
              children: [
                u.jsx("h4", {
                  className: "text-lg font-semibold",
                  children: "Added Locations",
                }),
                u.jsx("ul", {
                  className: "mt-2",
                  children: r.map((y) =>
                    u.jsxs(
                      "li",
                      {
                        className:
                          "bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center",
                        children: [
                          u.jsxs("div", {
                            className: "flex flex-col flex-1",
                            children: [
                              u.jsx("h5", {
                                className: "font-semibold",
                                children: y.name,
                              }),
                              u.jsx("p", {
                                className: "text-sm text-gray-600",
                              }),
                            ],
                          }),
                          u.jsx("button", {
                            className:
                              "ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs",
                            onClick: () => h(y.locationId),
                            disabled: c,
                            type: "button",
                            children: "Delete",
                          }),
                        ],
                      },
                      y.locationId,
                    ),
                  ),
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
function tw() {
  const { contactId: e } = Xr(),
    t = ze(),
    [n, r] = f.useState({
      name: "",
      phone: "",
      email: "",
      notes: "",
      description: "",
      uploadedById: "",
      locationIds: [],
    }),
    [i, o] = f.useState([]),
    [s, l] = f.useState([]),
    [a, c] = f.useState(""),
    [d, m] = f.useState(!0),
    [p, v] = f.useState(!1),
    [x, w] = f.useState(null);
  f.useEffect(() => {
    (async () => {
      if (!e) {
        w("No contact ID provided"), m(!1);
        return;
      }
      try {
        const [j, T] = await Promise.all([wm(e), tm()]);
        if (!j || typeof j != "object") throw new Error("Invalid contact data");
        if (!Array.isArray(T)) throw new Error("Invalid locations list");
        r({
          name: j.name ?? "",
          phone: j.phone ?? "",
          email: j.email ?? "",
          notes: j.notes ?? "",
          description: j.description ?? "",
          uploadedById: j.uploadedById ?? "",
          locationIds: j.locationIds ?? [],
        });
        const O = Array.isArray(T) ? T : [],
          L = Array.isArray(j.locationIds) ? j.locationIds : [];
        o(O);
        const R = O.filter(
          (Q) => typeof Q.locationId == "string" && L.includes(Q.locationId),
        );
        l(R);
      } catch (j) {
        console.error("Error loading contact:", j),
          w("Failed to load contact.");
      } finally {
        m(!1);
      }
    })();
  }, [e]);
  const E = (N) => {
      const { name: j, value: T } = N.target;
      r((O) => ({ ...O, [j]: T }));
    },
    h = (N) => {
      c(N.target.value);
    },
    g = () => {
      if (!a) return;
      const N = i.find((j) => j.locationId === a);
      !N ||
        typeof N.locationId != "string" ||
        s.find((j) => j.locationId === N.locationId) ||
        (l((j) => [...j, N]),
        r((j) => ({ ...j, locationIds: [...j.locationIds, N.locationId] })),
        c(""));
    },
    y = (N) => {
      l((j) => j.filter((T) => T.locationId !== N)),
        r((j) => ({ ...j, locationIds: j.locationIds.filter((T) => T !== N) }));
    },
    S = async (N) => {
      if ((N.preventDefault(), !e)) {
        w("Invalid contact ID.");
        return;
      }
      v(!0), w(null);
      try {
        const j = {
          name: n.name,
          phone: n.phone,
          email: n.email,
          notes: n.notes,
          description: n.description,
          uploadedById: n.uploadedById,
          assocLocationIds: n.locationIds,
        };
        await J1(e, j), t("/dashboard/contacts");
      } catch (j) {
        console.error("Error saving contact:", j), w("Failed to save contact.");
      } finally {
        v(!1);
      }
    };
  return d
    ? u.jsx("div", {
        className: "w-full h-full flex justify-center items-center",
        children: u.jsx(Lt, {}),
      })
    : u.jsxs("div", {
        className: "p-6 space-y-6",
        children: [
          u.jsx(Ke, {
            title: "Edit Contact",
            leftButtons: [
              { children: "Cancel", onClick: () => t("/dashboard/contacts") },
            ],
            buttons: [{ children: p ? "Saving..." : "Save", onClick: S }],
          }),
          x &&
            u.jsx("p", { className: "text-red-600 text-center", children: x }),
          u.jsxs("form", {
            onSubmit: S,
            className: "space-y-4 bg-white p-6 rounded-xl shadow",
            children: [
              u.jsxs("div", {
                children: [
                  u.jsx("label", {
                    className: "block text-sm font-medium",
                    children: "Name",
                  }),
                  u.jsx("input", {
                    name: "name",
                    value: n.name,
                    onChange: E,
                    required: !0,
                    className: "w-full p-2 border rounded-lg",
                  }),
                ],
              }),
              u.jsxs("div", {
                children: [
                  u.jsx("label", {
                    className: "block text-sm font-medium",
                    children: "Phone",
                  }),
                  u.jsx("input", {
                    name: "phone",
                    value: n.phone,
                    onChange: E,
                    required: !0,
                    className: "w-full p-2 border rounded-lg",
                  }),
                ],
              }),
              u.jsxs("div", {
                children: [
                  u.jsx("label", {
                    className: "block text-sm font-medium",
                    children: "Email",
                  }),
                  u.jsx("input", {
                    name: "email",
                    type: "email",
                    value: n.email,
                    onChange: E,
                    required: !0,
                    className: "w-full p-2 border rounded-lg",
                  }),
                ],
              }),
              u.jsxs("div", {
                children: [
                  u.jsx("label", {
                    className: "block text-sm font-medium",
                    children: "Notes",
                  }),
                  u.jsx("input", {
                    name: "notes",
                    value: n.notes,
                    onChange: E,
                    className: "w-full p-2 border rounded-lg",
                  }),
                ],
              }),
              u.jsxs("div", {
                children: [
                  u.jsx("label", {
                    className: "block text-sm font-medium",
                    children: "Description",
                  }),
                  u.jsx("textarea", {
                    name: "description",
                    value: n.description,
                    className: "w-full p-2 border rounded-lg",
                    rows: 3,
                  }),
                ],
              }),
            ],
          }),
          u.jsxs("div", {
            className: "bg-gray-50 p-6 rounded-xl shadow space-y-4",
            children: [
              u.jsx("label", {
                className: "block text-sm font-medium",
                children: "Associate Location",
              }),
              u.jsxs("select", {
                className: "w-full p-2 border rounded",
                onChange: h,
                value: a,
                children: [
                  u.jsx("option", {
                    value: "",
                    children: "-- Select Location --",
                  }),
                  i.map((N) =>
                    u.jsx(
                      "option",
                      { value: N.locationId, children: N.name },
                      N.locationId,
                    ),
                  ),
                ],
              }),
              u.jsx("button", {
                type: "button",
                className: "bg-blue-500 text-white px-4 py-2 rounded-lg",
                onClick: g,
                disabled: !a,
                children: "Add Location",
              }),
              s.length > 0 &&
                u.jsx("ul", {
                  className: "space-y-2 mt-4",
                  children: s.map((N) =>
                    u.jsxs(
                      "li",
                      {
                        className:
                          "flex justify-between items-center bg-white p-3 rounded shadow",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("p", {
                                className: "font-semibold",
                                children: N.name,
                              }),
                              "// ",
                              u.jsx("p", {
                                className: "text-sm text-gray-600",
                                children: N.notes,
                              }),
                            ],
                          }),
                          u.jsx("button", {
                            className:
                              "bg-red-500 text-white px-3 py-1 rounded text-sm",
                            onClick: () => {
                              N.locationId && y(N.locationId);
                            },
                            children: "Remove",
                          }),
                        ],
                      },
                      N.locationId,
                    ),
                  ),
                }),
            ],
          }),
        ],
      });
}
function nw() {
  const { contactId: e } = Xr(),
    t = ze(),
    {
      data: n,
      isLoading: r,
      error: i,
    } = Gi({
      queryKey: ["contact", e],
      queryFn: () => wm(String(e)),
      enabled: !!e,
    }),
    {
      data: o,
      isLoading: s,
      error: l,
    } = Gi({
      queryKey: ["shared-locations", e],
      queryFn: () => Y1(String(e)),
      enabled: !!e,
    });
  if (
    (f.useEffect(() => {
      e || console.warn("No contact ID found in URL.");
    }, [e]),
    r)
  )
    return u.jsx("div", {
      className: "w-full h-full flex justify-center items-center",
      children: u.jsx(Lt, {}),
    });
  if (i)
    return u.jsx("div", {
      className: "w-full h-full flex justify-center items-center",
      children: u.jsx(ji, {
        color: "danger",
        children: "Failed to load contact details.",
      }),
    });
  if (!n)
    return u.jsx("div", {
      className: "w-full h-full flex justify-center items-center",
      children: u.jsx(ji, { color: "warning", children: "Contact not found." }),
    });
  const a = (c) => (c ? new Date(c).toLocaleString() : "N/A");
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(Ke, {
        title: n.name || "Unnamed Contact",
        buttons: [
          {
            children: "SHARE",
            onClick: () => {
              alert("Share feature coming soon!");
            },
          },
          {
            children: "EDIT CONTACT",
            onClick: () => {
              t(`/contacts/edit/${e}`);
            },
          },
        ],
      }),
      u.jsxs(yt, {
        children: [
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Name:" }),
              " ",
              n.name || "N/A",
            ],
          }),
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Description:" }),
              " ",
              n.description || "No description",
            ],
          }),
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Email:" }),
              " ",
              n.email || "N/A",
            ],
          }),
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Phone:" }),
              " ",
              n.phone || "N/A",
            ],
          }),
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Notes:" }),
              " ",
              n.notes || "No notes available",
            ],
          }),
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Uploaded At:" }),
              " ",
              a(n.uploadedAt),
            ],
          }),
          u.jsxs("p", {
            children: [
              u.jsx("strong", { children: "Last Updated:" }),
              " ",
              a(n.lastUpdated),
            ],
          }),
        ],
      }),
      u.jsxs(yt, {
        className: "mt-4",
        children: [
          u.jsx("h2", {
            className: "text-lg font-semibold mb-2",
            children: "Shared Locations",
          }),
          s
            ? u.jsx(Lt, {})
            : l
              ? u.jsx(ji, {
                  color: "danger",
                  children: "Failed to load shared locations.",
                })
              : o && o.length > 0
                ? u.jsx("ul", {
                    className: "space-y-2",
                    children: o.map((c) => {
                      var d;
                      return u.jsxs(
                        "li",
                        {
                          className: "border-b pb-2",
                          children: [
                            u.jsx("p", {
                              className: "font-medium",
                              children: c.name,
                            }),
                            u.jsxs("p", {
                              className: "text-sm text-gray-600",
                              children: [
                                "Type: ",
                                c.locationType,
                                " ",
                                u.jsx("br", {}),
                                "Keywords: ",
                                ((d = c.keywords) == null
                                  ? void 0
                                  : d.join(", ")) || "None",
                              ],
                            }),
                          ],
                        },
                        c.locationId,
                      );
                    }),
                  })
                : u.jsx("p", {
                    className: "text-gray-500",
                    children: "No shared locations found for this contact.",
                  }),
        ],
      }),
    ],
  });
}
function rw() {
  const e = it(),
    {
      data: t,
      isLoading: n,
      isError: r,
      error: i,
    } = Gi({ queryFn: () => jx(), queryKey: ["userProfile", { userId: e }] });
  if (n)
    return u.jsx("div", {
      className:
        "w-full h-full flex justify-center align-center top-50 left-0 fixed bg-white bg-opacity-50 z-50",
      children: u.jsx(Lt, {}),
    });
  if (r)
    return u.jsxs("h1", {
      children: ["Error: ", i == null ? void 0 : i.message],
    });
  const o = t;
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(Ke, {
        title: `${o == null ? void 0 : o.firstName} ${o == null ? void 0 : o.lastName}`,
        buttons: [{ children: "EDIT PROFILE", onClick: () => {} }],
      }),
      u.jsxs("div", {
        className: "flex flex-wrap gap-6 max-w-5xl mx-auto mt-10",
        children: [
          u.jsxs("div", {
            className:
              "flex-1 bg-white shadow-lg rounded-lg p-6 h-auto md:h-[500px]",
            children: [
              u.jsx("h3", {
                className: "text-2xl font-bold text-gray-800 mb-4",
                children: "User Information",
              }),
              u.jsxs("div", {
                className: "space-y-4",
                children: [
                  u.jsxs("div", {
                    children: [
                      u.jsx("p", {
                        className: "text-sm text-gray-500",
                        children: "Full Name",
                      }),
                      u.jsxs("p", {
                        className: "text-lg font-medium text-gray-900",
                        children: [
                          o == null ? void 0 : o.firstName,
                          " ",
                          o == null ? void 0 : o.lastName,
                        ],
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    children: [
                      u.jsx("p", {
                        className: "text-sm text-gray-500",
                        children: "Email",
                      }),
                      u.jsx("p", {
                        className: "text-lg font-medium text-gray-900",
                        children: o == null ? void 0 : o.email,
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    children: [
                      u.jsx("p", {
                        className: "text-sm text-gray-500",
                        children: "Phone",
                      }),
                      u.jsx("p", {
                        className: "text-lg font-medium text-gray-900",
                        children: o == null ? void 0 : o.phone,
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    children: [
                      u.jsx("p", {
                        className: "text-sm text-gray-500",
                        children: "ID",
                      }),
                      u.jsx("p", {
                        className: "text-lg font-medium text-gray-900",
                        children: o == null ? void 0 : o.userId,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          u.jsxs("div", {
            className: "flex flex-col gap-6 flex-1",
            children: [
              u.jsxs("div", {
                className: "bg-white shadow-lg rounded-lg p-6 h-[240px]",
                children: [
                  u.jsx("h3", {
                    className: "text-lg font-bold text-gray-800 mb-2",
                    children: "Recent Activity",
                  }),
                  u.jsx("p", {
                    className: "text-sm text-gray-600",
                    children: "No recent activity yet.",
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "bg-white shadow-lg rounded-lg p-6 h-[240px]",
                children: [
                  u.jsx("h3", {
                    className: "text-lg font-bold text-gray-800 mb-4",
                    children: "Incoming Bills",
                  }),
                  u.jsxs("ul", {
                    className: "space-y-3",
                    children: [
                      u.jsxs("li", {
                        className: "flex justify-between items-center",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("p", {
                                className: "text-sm font-medium text-gray-900",
                                children: "Monthly membership",
                              }),
                              u.jsx("p", {
                                className: "text-xs text-gray-500",
                                children: "Due: Jan 30, 2025",
                              }),
                            ],
                          }),
                          u.jsx("p", {
                            className: "text-sm font-semibold text-red-600",
                            children: "$120.00",
                          }),
                        ],
                      }),
                      u.jsxs("li", {
                        className: "flex justify-between items-center",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("p", {
                                className: "text-sm font-medium text-gray-900",
                                children: "Montly membership",
                              }),
                              u.jsx("p", {
                                className: "text-xs text-gray-500",
                                children: "Due: Feb 5, 2025",
                              }),
                            ],
                          }),
                          u.jsx("p", {
                            className: "text-sm font-semibold text-red-600",
                            children: "$120.00",
                          }),
                        ],
                      }),
                      u.jsxs("li", {
                        className: "flex justify-between items-center",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("p", {
                                className: "text-sm font-medium text-gray-900",
                                children: "Extra users",
                              }),
                              u.jsx("p", {
                                className: "text-xs text-gray-500",
                                children: "Due: Feb 10, 2025",
                              }),
                            ],
                          }),
                          u.jsx("p", {
                            className: "text-sm font-semibold text-red-600",
                            children: "$50.00",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function iw() {
  return u.jsx(u.Fragment, {
    children: u.jsxs("nav", {
      className: "blue",
      children: [
        u.jsxs("div", {
          className: "nav-wrapper container",
          children: [
            u.jsxs(Ct, {
              to: B.HOME,
              className: "brand-logo",
              children: [
                u.jsx("i", {
                  className: "material-icons",
                  children: "whatshot",
                }),
                " Locus Point",
              ],
            }),
            u.jsx("a", {
              href: "#top",
              "data-target": "mobile-demo",
              className: "sidenav-trigger",
              children: u.jsx("i", {
                className: "material-icons",
                children: "menu",
              }),
            }),
            u.jsxs("ul", {
              className: "right hide-on-med-and-down",
              children: [
                u.jsx("li", {
                  children: u.jsx(Ct, { to: B.ABOUT, children: "About" }),
                }),
                u.jsx("li", {
                  children: u.jsx(Ct, { to: B.PRICING, children: "Pricing" }),
                }),
                u.jsx("li", {
                  children: u.jsx(Ct, { to: B.LOGIN, children: "Login" }),
                }),
              ],
            }),
          ],
        }),
        u.jsxs("ul", {
          className: "sidenav",
          id: "mobile-demo",
          children: [
            u.jsx("li", {
              children: u.jsx(Ct, { to: B.HOME, children: "About" }),
            }),
            u.jsx("li", {
              children: u.jsx(Ct, { to: B.PRICING, children: "Pricing" }),
            }),
            u.jsx("li", {
              children: u.jsx(Ct, { to: B.LOGIN, children: "Login" }),
            }),
          ],
        }),
      ],
    }),
  });
}
const ow = () => {
  const e = [
    {
      title: "Basic",
      price: "$9.99 / month",
      features: [
        "Up to 10 locations",
        "Basic location details",
        "Email support",
      ],
      buttonText: "Choose Basic",
      buttonLink: "/subscribe/basic",
      headerClass: "bg-light text-primary",
      cardClass: "shadow-sm",
    },
    {
      title: "Pro",
      price: "$29.99 / month",
      features: [
        "Up to 50 locations",
        "Detailed analytics",
        "Priority email support",
      ],
      buttonText: "Choose Pro",
      buttonLink: "/subscribe/pro",
      headerClass: "bg-primary text-white",
      cardClass: "shadow-lg",
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      features: [
        "Unlimited locations",
        "Dedicated account manager",
        "24/7 support",
      ],
      buttonText: "Contact Us",
      buttonLink: "/contact",
      headerClass: "bg-light text-primary",
      cardClass: "shadow-sm",
    },
  ];
  return u.jsxs(ac, {
    className: "py-5",
    children: [
      u.jsx(iw, {}),
      u.jsx(Os, {
        className: "justify-content-center text-center",
        children: u.jsxs(Ts, {
          md: "8",
          children: [
            u.jsx("h1", {
              className: "display-4 text-primary mb-3",
              children: "Pricing Plans",
            }),
            u.jsx("p", {
              className: "lead text-muted",
              children:
                "Choose the plan that fits your needs and take your production management to the next level.",
            }),
          ],
        }),
      }),
      u.jsx(Os, {
        className: "mt-5",
        children: e.map((t, n) =>
          u.jsx(
            Ts,
            {
              md: "4",
              className: "mb-4",
              children: u.jsxs(Ys, {
                className: `rounded pricing-card ${t.cardClass}`,
                children: [
                  u.jsxs(nc, {
                    className: `text-center ${t.headerClass}`,
                    children: [
                      u.jsx("h2", {
                        className: "font-weight-bold",
                        children: t.title,
                      }),
                      u.jsx("p", {
                        className: t.headerClass.includes("text-white")
                          ? ""
                          : "text-muted",
                        children: t.price,
                      }),
                    ],
                  }),
                  u.jsxs(Js, {
                    children: [
                      u.jsx("ul", {
                        className: "list-unstyled text-center mb-4",
                        children: t.features.map((r, i) =>
                          u.jsx("li", { children: r }, i),
                        ),
                      }),
                      u.jsx("div", {
                        className: "text-center",
                        children: u.jsx(tc, {
                          color: "primary",
                          href: t.buttonLink,
                          children: t.buttonText,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            },
            n,
          ),
        ),
      }),
    ],
  });
};
function sw() {
  const e = ze(),
    [t, n] = f.useState({ email: "", password: "" }),
    [r, i] = f.useState(!1),
    [o, s] = f.useState(null),
    [l, a] = f.useState(null),
    c = (p) => {
      const { name: v, value: x } = p.target;
      n({ ...t, [v]: x });
    },
    d = async (p) => {
      p.preventDefault(),
        i(!0),
        s(null),
        a(null),
        kx(t)
          .then(() => {
            e(B.PRODUCTIONS);
          })
          .catch((v) => {
            s(v.message);
          })
          .finally(() => {
            i(!1);
          });
    },
    m = () => {
      e(B.REGISTER);
    };
  return u.jsxs("div", {
    className: "login-container",
    children: [
      u.jsx("h1", { children: "Login" }),
      u.jsxs("form", {
        onSubmit: d,
        className: "login-form",
        children: [
          o && u.jsx("p", { className: "error-message", children: o }),
          l && u.jsx("p", { className: "success-message", children: l }),
          u.jsxs("div", {
            className: "form-group",
            children: [
              u.jsx("label", { htmlFor: "email", children: "Email" }),
              u.jsx("input", {
                type: "email",
                id: "email",
                name: "email",
                value: t.email,
                onChange: c,
                required: !0,
              }),
            ],
          }),
          u.jsxs("div", {
            className: "form-group",
            children: [
              u.jsx("label", { htmlFor: "password", children: "Password" }),
              u.jsx("input", {
                type: "password",
                id: "password",
                name: "password",
                value: t.password,
                onChange: c,
                required: !0,
              }),
            ],
          }),
          u.jsx("button", {
            type: "submit",
            disabled: r,
            onClick: d,
            children: r ? "Logging in..." : "Login",
          }),
        ],
      }),
      u.jsxs("div", {
        className: "register-link",
        children: [
          u.jsx("p", { children: "Don't have an account?" }),
          u.jsx("button", { onClick: m, children: "Register" }),
        ],
      }),
    ],
  });
}
function lw() {
  const [e, t] = f.useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    }),
    [n, r] = f.useState(!1),
    [i, o] = f.useState(null),
    [s, l] = f.useState(null),
    [a, c] = f.useState({}),
    d = (p) => {
      const { name: v, value: x } = p.target;
      t({ ...e, [v]: x });
    },
    m = async (p) => {
      p.preventDefault(), r(!0), l(null), c({}), o(null);
      try {
        await Nx(e),
          o("Registration successful! You can now log in."),
          t({ email: "", password: "", firstName: "", lastName: "" });
      } catch (v) {
        if (v && typeof v == "object" && "errors" in v) {
          const x = v;
          c(x.errors || {}), l(x.message);
        } else
          v instanceof Error
            ? l(v.message)
            : l("Something went wrong on our end");
      } finally {
        r(!1);
      }
    };
  return u.jsxs("div", {
    className: "signup-container",
    children: [
      u.jsx("h1", { children: "Sign Up" }),
      u.jsxs("form", {
        onSubmit: m,
        className: "signup-form",
        children: [
          s && u.jsx("p", { className: "error-message", children: s }),
          i && u.jsx("p", { className: "success-message", children: i }),
          u.jsxs("div", {
            className: "form-group",
            children: [
              u.jsx("label", { htmlFor: "firstName", children: "First Name" }),
              u.jsx("input", {
                type: "text",
                id: "firstName",
                name: "firstName",
                value: e.firstName,
                onChange: d,
                required: !0,
              }),
              a.firstName &&
                u.jsx("p", { className: "field-error", children: a.firstName }),
            ],
          }),
          u.jsxs("div", {
            className: "form-group",
            children: [
              u.jsx("label", { htmlFor: "lastName", children: "Last Name" }),
              u.jsx("input", {
                type: "text",
                id: "lastName",
                name: "lastName",
                value: e.lastName,
                onChange: d,
                required: !0,
              }),
              a.lastName &&
                u.jsx("p", { className: "field-error", children: a.lastName }),
            ],
          }),
          u.jsxs("div", {
            className: "form-group",
            children: [
              u.jsx("label", { htmlFor: "email", children: "Email" }),
              u.jsx("input", {
                type: "email",
                id: "email",
                name: "email",
                value: e.email,
                onChange: d,
                required: !0,
              }),
              a.email &&
                u.jsx("p", { className: "field-error", children: a.email }),
            ],
          }),
          u.jsxs("div", {
            className: "form-group",
            children: [
              u.jsx("label", { htmlFor: "password", children: "Password" }),
              u.jsx("input", {
                type: "password",
                id: "password",
                name: "password",
                value: e.password,
                onChange: d,
                required: !0,
                minLength: 8,
              }),
              a.password &&
                u.jsx("p", { className: "field-error", children: a.password }),
            ],
          }),
          u.jsx("button", {
            type: "submit",
            disabled: n,
            children: n ? "Submitting..." : "Sign Up",
          }),
        ],
      }),
    ],
  });
}
function aw() {
  return _a()
    ? u.jsx(Pp, { to: B.LOCATIONS, replace: !0 })
    : u.jsxs($t, {
        className: "h-full bg-sunset",
        children: [
          u.jsx("div", {
            className:
              "w-2/3 h-full bg-gradient-to-l from-black to-transparent",
          }),
          u.jsx(Je, {
            className: "bg-white w-1/3 h-full m-0",
            children: u.jsx(Lp, {}),
          }),
        ],
      });
}
function uw({ title: e, description: t, image: n, onClick: r }) {
  return u.jsxs(Ys, {
    className: "hover:bg-gray-200 cursor-pointer",
    onClick: r,
    children: [
      u.jsx(rc, { orientation: "top", src: n }),
      u.jsxs(Js, {
        children: [
          u.jsx(oc, { children: e }),
          u.jsx(ic, { children: "Subtitle" }),
          u.jsx(js, { children: t }),
          u.jsx(js, {
            children: u.jsx("small", {
              className: "text-body-secondary",
              children: "Last updated 3 mins ago",
            }),
          }),
        ],
      }),
    ],
  });
}
const cw = async () => {
  const e = it();
  if (!e) throw new Error("No authentication token found. Please log in.");
  const t = await fetch(`${tl}/my-productions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${e}`,
    },
  });
  if (!t.ok) throw new Error(`HTTP error! status: ${t.status}`);
  const n = await t.json();
  return (
    console.log(n),
    n.map((r) => ({
      productionId: r.productionId,
      title: r.title,
      description: r.description,
    }))
  );
};
async function Cm(e) {
  return ot(`${tl}/${e}`, {
    method: "GET",
    authenticate: !0,
    headers: {
      Authorization: `Bearer ${it()}`,
      "Content-Type": "application/json",
    },
  });
}
async function dw(e) {
  const t = JSON.stringify(e);
  return ot(`${tl}`, {
    method: "POST",
    authenticate: !0,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${it()}`,
    },
    body: t,
  });
}
async function fw(e, t) {
  const n = JSON.stringify(t);
  return ot(`${tl}/${e}`, {
    method: "PUT",
    authenticate: !0,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${it()}`,
    },
    body: n,
  });
}
function hw() {
  const [e, t] = f.useState([]),
    [n, r] = f.useState(!0),
    [i, o] = f.useState(null),
    s = ze();
  return (
    f.useEffect(() => {
      (async () => {
        try {
          const a = await cw();
          t(a);
        } catch (a) {
          o(a.message), a === "Unauthorized" && cc(s);
        } finally {
          r(!1);
        }
      })();
    }, []),
    n
      ? u.jsx("p", { children: "Loading..." })
      : i
        ? u.jsxs("p", { children: ["Error: ", i] })
        : u.jsxs(u.Fragment, {
            children: [
              u.jsx(Ke, {
                title: "Productions",
                buttons: [
                  {
                    children: "CREATE NEW PRODUCTION",
                    onClick: () => s("add"),
                  },
                ],
              }),
              u.jsx("div", {
                className: "card-container",
                children: e.map((l) =>
                  u.jsx(
                    uw,
                    {
                      image: el,
                      title: l.title,
                      description: l.description,
                      onClick: () => {
                        s(`${l.productionId}`);
                      },
                    },
                    l.productionId,
                  ),
                ),
              }),
            ],
          })
  );
}
function pw() {
  const { productionId: e } = Xr(),
    t = ze(),
    {
      data: n,
      isLoading: r,
      error: i,
    } = Gi({
      queryFn: () => Cm(e || ""),
      queryKey: ["production", { productionId: e }],
    });
  return r
    ? u.jsx("div", {
        className: "w-full h-full flex justify-center items-center",
        children: u.jsx(Lt, {}),
      })
    : i
      ? u.jsx("p", {
          className: "text-red-600",
          children: "Error loading production data.",
        })
      : u.jsxs(u.Fragment, {
          children: [
            u.jsx(Ke, {
              title: (n == null ? void 0 : n.title) || "Production Details",
              leftButtons: [
                {
                  children: "BACK",
                  onClick: () => t("/dashboard/productions"),
                },
              ],
              buttons: [
                { children: "SHARE", onClick: () => {} },
                {
                  children: "EDIT PRODUCTION",
                  onClick: () => {
                    n != null &&
                      n.productionId &&
                      t(`${ae.EDIT_PRODUCTION}/${n.productionId}`);
                  },
                },
              ],
            }),
            u.jsxs(yt, {
              className: "p-4 max-w-4xl mx-auto",
              children: [
                u.jsx("img", {
                  src: el,
                  alt: (n == null ? void 0 : n.title) || "Production Image",
                  className: "w-full max-h-72 object-cover rounded",
                }),
                u.jsx("h2", {
                  className: "text-2xl font-bold mt-4",
                  children: n == null ? void 0 : n.title,
                }),
                (n == null ? void 0 : n.description) &&
                  u.jsx("p", { className: "mt-2", children: n.description }),
              ],
            }),
          ],
        });
}
function mw() {
  const [e, t] = f.useState(""),
    [n, r] = f.useState(""),
    i = ze(),
    o = async () => {
      try {
        await dw({ title: e, description: n }), i(ae.PRODUCTIONS);
      } catch (s) {
        console.error("Failed to create production:", s);
      }
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx(Ke, {
        title: "Add New Production",
        leftButtons: [{ children: "CANCEL", onClick: () => i(ae.PRODUCTIONS) }],
        buttons: [{ children: "SAVE", onClick: o }],
      }),
      u.jsxs(yt, {
        className: "p-4 max-w-3xl mx-auto space-y-4",
        children: [
          u.jsx("input", {
            type: "text",
            placeholder: "Production Title",
            className: "w-full p-2 border border-gray-300 rounded",
            value: e,
            onChange: (s) => t(s.target.value),
          }),
          u.jsx("textarea", {
            placeholder: "Description",
            className: "w-full p-2 border border-gray-300 rounded",
            value: n,
            onChange: (s) => r(s.target.value),
          }),
        ],
      }),
    ],
  });
}
function gw() {
  const { productionId: e } = Xr(),
    t = ze(),
    [n, r] = f.useState(""),
    [i, o] = f.useState(""),
    [s, l] = f.useState(!0),
    [a, c] = f.useState(!1),
    [d, m] = f.useState(null);
  f.useEffect(() => {
    (async () => {
      try {
        const x = await Cm(e || "");
        r(x.title || ""), o(x.description || "");
      } catch (x) {
        console.error("Error fetching production:", x),
          m("Failed to load production data.");
      } finally {
        l(!1);
      }
    })();
  }, [e]);
  const p = async () => {
    c(!0);
    try {
      await fw(e || "", { title: n, description: i }), t(ae.PRODUCTIONS);
    } catch (v) {
      console.error("Error updating production:", v),
        m("Failed to save changes.");
    } finally {
      c(!1);
    }
  };
  return s
    ? u.jsx("div", {
        className: "w-full h-full flex justify-center items-center",
        children: u.jsx(Lt, {}),
      })
    : d
      ? u.jsx("p", { className: "text-red-600 text-center mt-6", children: d })
      : u.jsxs(u.Fragment, {
          children: [
            u.jsx(Ke, {
              title: "Edit Production",
              leftButtons: [
                { children: "CANCEL", onClick: () => t(ae.PRODUCTIONS) },
              ],
              buttons: [{ children: a ? "SAVING..." : "SAVE", onClick: p }],
            }),
            u.jsxs(yt, {
              className: "p-4 max-w-3xl mx-auto space-y-4",
              children: [
                u.jsx("input", {
                  type: "text",
                  placeholder: "Production Title",
                  className: "w-full p-2 border border-gray-300 rounded",
                  value: n,
                  onChange: (v) => r(v.target.value),
                }),
                u.jsx("textarea", {
                  placeholder: "Description",
                  className: "w-full p-2 border border-gray-300 rounded",
                  value: i,
                  onChange: (v) => o(v.target.value),
                }),
              ],
            }),
          ],
        });
}
function yw() {
  const { locationId: e } = Xr(),
    t = ze(),
    [n, r] = f.useState(""),
    [i, o] = f.useState(""),
    [s, l] = f.useState([]),
    [a, c] = f.useState(!0),
    [d, m] = f.useState(!1),
    [p, v] = f.useState(null);
  f.useEffect(() => {
    (async () => {
      try {
        const E = await em(e || "");
        r(E.name || ""), o(E.notes || "");
        const h = Object.values(E.addresses || {});
        l(h);
      } catch (E) {
        console.error("Error fetching location:", E),
          v("Failed to load location data.");
      } finally {
        c(!1);
      }
    })();
  }, [e]);
  const x = async () => {
    m(!0), v(null);
    try {
      const w = new Map();
      s.forEach((h, g) => w.set(g, h));
      const E = {
        locationId: e,
        name: n,
        notes: i,
        locationType: "",
        keywords: [],
        candidateIds: [],
        contactIds: [],
        locationPhotoIds: [],
        addresses: Object.fromEntries(w),
      };
      await Ex(e || "", E), t(ae.LOCATIONS);
    } catch (w) {
      console.error("Error updating location:", w),
        v("Failed to save changes.");
    } finally {
      m(!1);
    }
  };
  return a
    ? u.jsx("div", {
        className: "w-full h-full flex justify-center items-center",
        children: u.jsx(Lt, {}),
      })
    : p
      ? u.jsx("p", { className: "text-red-600 text-center mt-6", children: p })
      : u.jsxs(u.Fragment, {
          children: [
            u.jsx(Ke, {
              title: "Edit Location",
              leftButtons: [
                { children: "CANCEL", onClick: () => t(ae.LOCATIONS) },
              ],
              buttons: [{ children: d ? "SAVING..." : "SAVE", onClick: x }],
            }),
            u.jsxs(yt, {
              className: "p-4 max-w-3xl mx-auto space-y-4",
              children: [
                u.jsx(Ps, {
                  name: "name",
                  onChange: (w) => r(w),
                  placeholder: "Location name",
                }),
                u.jsx(Ps, {
                  name: "notes",
                  onChange: (w) => o(w),
                  placeholder: "Description",
                }),
                u.jsx(qp, {
                  label: "Address",
                  max: 4,
                  itemRenderer: (w, E) =>
                    u.jsxs(Je, {
                      className:
                        "gap-2 my-2 border-1 border-gray-300 rounded p-3 bg-gray-50",
                      children: [
                        u.jsx("span", {
                          className: "flex justify-end",
                          children: u.jsx(Qt, {
                            className: "hover:cursor-pointer",
                            icon: Up,
                            onClick: E,
                          }),
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "postalCode",
                          onChange: w,
                          placeholder: "Postal Code",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "addressLine1",
                          onChange: w,
                          placeholder: "Address Line 1",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "addressLine2",
                          onChange: w,
                          placeholder: "Address Line 2",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "stateProvinceRegion",
                          onChange: w,
                          placeholder: "Province or State",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "city",
                          onChange: w,
                          placeholder: "City",
                        }),
                        u.jsx("input", {
                          type: "text",
                          name: "country",
                          onChange: w,
                          placeholder: "Country",
                        }),
                        u.jsx("input", {
                          type: "hidden",
                          name: "longitude",
                          onChange: w,
                        }),
                        u.jsx("input", {
                          type: "hidden",
                          name: "latitude",
                          onChange: w,
                        }),
                      ],
                    }),
                  onDataChange: l,
                }),
              ],
            }),
          ],
        });
}
function vw() {
  return u.jsx(x0, {
    children: u.jsxs(qv, {
      children: [
        u.jsx(se, { path: B.HOME, element: u.jsx(O0, {}) }),
        u.jsx(se, { path: B.PROFILE, element: u.jsx(rw, {}) }),
        u.jsx(se, { path: B.PRICING, element: u.jsx(ow, {}) }),
        u.jsxs(se, {
          path: Ia,
          element: u.jsx(aw, {}),
          children: [
            u.jsx(se, { index: !0, path: B.LOGIN, element: u.jsx(sw, {}) }),
            u.jsx(se, { path: B.REGISTER, element: u.jsx(lw, {}) }),
          ],
        }),
        u.jsxs(se, {
          path: pi,
          element: u.jsx(px, {}),
          children: [
            u.jsx(se, { path: ae.LOCATIONS, element: u.jsx(Tx, {}) }),
            u.jsx(se, {
              path: `${ae.LOCATIONS}/:locationId`,
              element: u.jsx(K1, {}),
            }),
            u.jsx(se, { path: ae.ADD_LOCATION, element: u.jsx(Px, {}) }),
            u.jsx(se, {
              path: `${ae.EDIT_LOCATION}/:locationId`,
              element: u.jsx(yw, {}),
            }),
            u.jsx(se, { path: ae.PRODUCTIONS, element: u.jsx(hw, {}) }),
            u.jsx(se, {
              path: `${ae.PRODUCTIONS}/:productionId`,
              element: u.jsx(pw, {}),
            }),
            u.jsx(se, { path: ae.ADD_PRODUCTION, element: u.jsx(mw, {}) }),
            u.jsx(se, {
              path: `${ae.EDIT_PRODUCTION}/:productionId`,
              element: u.jsx(gw, {}),
            }),
            u.jsx(se, { path: ae.CONTACTS, element: u.jsx(Zd, {}) }),
            u.jsx(se, {
              path: `${ae.CONTACTS}/:contactId`,
              element: u.jsx(nw, {}),
            }),
            u.jsx(se, { path: ae.ADD_CONTACT, element: u.jsx(ew, {}) }),
            u.jsx(se, {
              path: `${ae.EDIT_CONTACT}/:contactId`,
              element: u.jsx(tw, {}),
            }),
            u.jsx(se, { path: B.CALENDAR, element: u.jsx(Zd, {}) }),
          ],
        }),
      ],
    }),
  });
}
const xw = new Qx();
xp(document.getElementById("root")).render(
  u.jsx(Zx, {
    client: xw,
    children: u.jsx(x1, {
      apiKey: "AIzaSyCrJSl5yVLeNCyUgKd6KFrqSXhKepAbErE",
      children: u.jsx(vw, {}),
    }),
  }),
);
