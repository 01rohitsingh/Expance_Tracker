export const filterData = (data, search) => {

  if (!search) return data;

  return data.filter((item) =>

    Object.values(item).some((value) =>

      String(value)
        .toLowerCase()
        .includes(search.toLowerCase())

    )

  );

};
