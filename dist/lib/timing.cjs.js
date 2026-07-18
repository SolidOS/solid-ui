function e(e,t){let n=null,r=(...i)=>{r.cancel(),n=setTimeout(()=>t(...i),e)};return r.cancel=()=>{n!==null&&(clearTimeout(n),n=null)},r}exports.debounce=e;
//# sourceMappingURL=timing.cjs.js.map