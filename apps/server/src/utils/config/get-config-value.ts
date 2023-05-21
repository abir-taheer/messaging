import { prisma } from "@/database/prisma";

type AppConfigTypes = {
  sessionSecret: string;
};

export const getConfigValue = async <Key extends keyof AppConfigTypes>(
  field: Key,
  defaultValue: AppConfigTypes[Key]
): Promise<AppConfigTypes[Key]> => {
  let value = defaultValue;

  const row = await prisma.appConfig.findFirst({
    where: { field },
  });

  if (row) {
    value = JSON.parse(row.value) as AppConfigTypes[Key];
  } else {
    await prisma.appConfig.create({
      data: {
        field,
        value: JSON.stringify(value),
      },
    });
  }

  return value;
};
