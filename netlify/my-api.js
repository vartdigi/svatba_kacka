let votes = {
  prijezd: {
    obrad: 0,
    party: 0,
    celyDen: 0,
    neprijdu: 0,
  },
  spani: {
    ne: 0,
    autoStan: 0,
    zaplatim: 0,
  },
  jidlo: {
    vegetarian: 0,
  },
};

exports.handler = async function (event, context) {
  if (event.httpMethod === 'GET') {
    // Pokud je požadavek GET, vracíme všechny hlasy
    return {
      statusCode: 200,
      body: JSON.stringify(votes),
    };
  }

  if (event.httpMethod === 'POST') {
    // Pokud je požadavek POST, aktualizujeme hlasování
    const { category, option } = JSON.parse(event.body);

    if (votes[category] && votes[category][option] !== undefined) {
      votes[category][option] += 1;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(votes),
    };
  }

  // Pokud metoda není GET ani POST, vrátíme chybu
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
