// 기한 계산
function calculateDeadline(date) {
  const expiryDay = new Date(date);
  const today = new Date();
  if (expiryDay.toLocaleDateString() === today.toLocaleDateString()) {
    return 'D-Day';
  }
  const diff = today.getTime() - expiryDay.getTime();
  const deadline = parseInt(Math.abs(diff / (1000 * 60 * 60 * 24)) + 1);
  if (diff > 0) {
    return `D+${deadline - 1}`;
  }
  return `D-${deadline}`;
}

function formatDate(deadline) {
  const date = new Date(deadline);
  const formattedDate =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 9
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
  return formattedDate;
}

export { calculateDeadline, formatDate };
