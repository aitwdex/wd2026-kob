// WMO天気コード（数字）を受け取って、天気のイメージカラーを返す

export function codeToColor(code) {
  if (code === 0) return "orangered";
  if (code <= 3) return "orange";
  if (code <= 48) return "whitesmoke";
  if (code <= 67) return "blue";
  if (code <= 77) return "lightblue";
  if (code <= 82) return "mediumblue";
  return "yellow";
}