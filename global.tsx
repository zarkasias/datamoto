module.exports = {
    initialScreen: 'Login',
    currentScreen: null,
    host: 'localhost',
    apiURL: 'https://app.datamoto.com',
    username: undefined,
    //apiURL: 'http://10.0.2.2:9080',
    apikey: "23452342353",
    authToken: null,
    companyId: null,
    statusbarBackground: '#00348a',
    headerBackground: '#3278eb',
    countries: [
      { label: 'United States', value: 'US' },
      { label: 'Canada', value: 'CA' },
      { label: 'England', value: 'GB' }
    ],

    states: [
      { label: 'California', value: 'CA' },
      { label: 'Alabama', value: 'AL' },
      { label: 'Florida', value: 'FL' }
    ],

    currencies: [
      { label: 'United States Dollar', value: 'USD' },
        { label: 'Canadian Dollar', value: 'CAD' },
        { label: 'Pound', value: 'GBP' }
    ],

    languages: [
      { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'Spanish', value: 'sp' }
    ],

    customers: [
      { label: 'Myn System', value: 'MS' },
        { label: 'Double O', value: 'DO' },
        { label: 'Crest Twenty', value: 'CT' }
    ],

    mou: {},
    tax: [{}],
    term: {},
    ship: {}

  }
