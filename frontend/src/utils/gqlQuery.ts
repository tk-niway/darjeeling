export function convertInputData4Prisma<T>(data: Record<string, any>) {
  const convertedData = Object.keys(data).reduce((acc, key) => {
    acc[key] = { set: data[key] };
    return acc;
  }, {} as Record<string, { set: any }>);

  return convertedData as T;
}
