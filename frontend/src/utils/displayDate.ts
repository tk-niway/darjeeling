export function displayDate(date: string): string {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const timeDiff = Math.abs(currentDate.getTime() - targetDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays === 0) {
    return "今日";
  }

  if (diffDays === 1) {
    return "昨日";
  }

  if (diffDays >= 30) {
    return `${Math.floor(diffDays / 30)}ヶ月前`;
  }

  return `${diffDays}日前`;
}
