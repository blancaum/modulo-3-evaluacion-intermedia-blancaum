const callToApi = () => {
  return fetch(
    `https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/adalabers-v1/promo-radsajsd.json`
  )
    .then((response) => response.json())
    .then((response) => {
      const result = response.results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          counselor: result.counselor,
          speciality: result.speciality,
        };
      });
      return result;
    });
};

export default callToApi;
