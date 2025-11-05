const el = () => document.getElementById("page-loader");

export function showLoader() {
  el()?.classList.add("is-visible");
}
export function hideLoader() {
  el()?.classList.remove("is-visible");
}
