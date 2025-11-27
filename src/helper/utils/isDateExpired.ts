export const isDateExpired = (date: string | Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
  
    return today >= target;
  };
  