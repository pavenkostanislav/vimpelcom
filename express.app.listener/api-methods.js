const config = require('./config.json');

module.exports = {
  apiMethods: router => {
    if (config === {}) {
      console.log('Добавьте параметры сервисов заглушки в config.json');
      return;
    }

    var httpCode = {};
    httpCode.userId = getStatus(`${config.user.id}`);
    httpCode.userUser = getStatus(`${config.user.user.get}`);
    httpCode.userCheckApplication = getStatus(
      `${config.user.checkApplication}`
    );
    httpCode.userVisitInformation = getStatus(
      `${config.user.visitInformation}`
    );
    httpCode.applicationStatus = getStatus(`${config.application.status}`);
    httpCode.applicationApplication = getStatus(
      `${config.application.application}`
    );

    router.get('/user/loginByEsia/', (req, res) =>
      res
        .status(301)
        .header('Location', `${config.redirect.hostname}`)
        .redirect(`${config.redirect.hostname}${config.redirect.modalOrPage}`)
    );

    router.get('/generateUtms', (req, res) =>
      res
        .status(301)
        .header('Location', `${config.redirect.hostname}`)
        .redirect(
          `${config.redirect.hostname}login${jsonToQueryString(config.utm)}`
        )
    );

    router.get('/user/id/', (req, res) =>
      res
        .status(httpCode.userId)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .header('Cache-Control', 'no-cache')
        .header('Last-Modified', new Date().toUTCString())
        .json(require(`./user/id/${config.user.id}.json`))
    );

    router.get('/user/logoutEsia/', (req, res) =>
      res.status(303).redirect('http://localhost:5555/#/login')
    );

    router
      .route('/user/user/')
      .get((req, res, next) =>
        res
          .status(httpCode.userUser)
          .header('Accept', 'application/json')
          .header('X-Requested-With', 'XMLHttpRequest')
          .header('Access-Control-Allow-Origin', 'http://localhost:5555')
          .header('Access-Control-Allow-Credentials', true)
          .header('Access-Control-Allow-Methods', 'GET')
          .header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
          )
          .header('Cache-Control', 'no-cache')
          .header('Last-Modified', new Date().toUTCString())
          .json(require(`./user/user/${config.user.user.get}.json`))
      )
      .post((req, res, next) =>
        res
          .status(200)
          .header('Accept', 'application/json')
          .header('X-Requested-With', 'XMLHttpRequest')
          .header('Access-Control-Allow-Origin', 'http://localhost:5555')
          .header('Access-Control-Allow-Credentials', true)
          .header('Access-Control-Allow-Methods', 'GET')
          .header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
          )
          .json(require(`./user/user/${config.user.user.post}.json`))
      )
      .put((req, res, next) =>
        res
          .status(200)
          .header('Accept', 'application/json')
          .header('X-Requested-With', 'XMLHttpRequest')
          .header('Access-Control-Allow-Origin', 'http://localhost:5555')
          .header('Access-Control-Allow-Credentials', true)
          .header('Access-Control-Allow-Methods', 'GET')
          .header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
          )
          .json(require(`./user/user/${config.user.user.put}.json`))
      );

    router.get('/application/status/', (req, res) =>
      res
        .status(httpCode.applicationStatus)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .header('Cache-Control', 'no-cache')
        .header('Last-Modified', new Date().toUTCString())
        .json(require(`./application/status/${config.application.status}.json`))
    );

    router.get('/internal/sms/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./internal/sms/${config.internal.sms}.json`))
    );

    router.get('/rb/*', (req, res) =>
      res
        .status(200)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', '*')
        .header(
          'Access-Control-Allow-Methods',
          'GET, POST, HEAD, PUT, DELETE, OPTIONS'
        )
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./rb/test${req.params[0]}.json`))
    );

    router.get('/dictionary/brand/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./dictionary/brand/${config.dictionary.brand}.json`))
    );

    router.get('/dictionary/businessType/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/businessType/${config.dictionary.businessType}.json`)
        )
    );

    router.get('/dictionary/education/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/education/${config.dictionary.education}.json`)
        )
    );

    router.get('/dictionary/marriageStatus/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/marriageStatus/${config.dictionary.marriageStatus}.json`)
        )
    );

    router.get('/dictionary/model/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./dictionary/model/${config.dictionary.model}.json`))
    );

    router.get('/dictionary/positionType/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/positionType/${config.dictionary.positionType}.json`)
        )
    );

    router.get('/dictionary/residencePlaceType/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/residencePlaceType/${config.dictionary.residencePlaceType}.json`)
        )
    );

    router.get('/dictionary/secondDocumentType/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/secondDocumentType/${config.dictionary.secondDocumentType}.json`)
        )
    );

    router.get('/dictionary/sex/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./dictionary/sex/${config.dictionary.sex}.json`))
    );

    router.get('/dictionary/socialStatus/', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./dictionary/socialStatus/${config.dictionary.socialStatus}.json`)
        )
    );

    router.get('/user/checkApplication/', (req, res) =>
      res
        .status(httpCode.userCheckApplication)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .header('Cache-Control', 'no-cache')
        .header('Last-Modified', new Date().toUTCString())
        .json(
          require(`./user/checkApplication/${config.user.checkApplication}.json`)
        )
    );

    router.get('/application/prefilling/:t', (req, res) =>
      res
        .status('200')
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./application/prefilling/test${req.params.t}.json`))
    );

    router.get('/application/application/', (req, res) =>
      res
        .status(httpCode.applicationApplication)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .header('Cache-Control', 'no-cache')
        .header('Last-Modified', new Date().toUTCString())
        .json(
          require(`./application/application/${config.application.application}.json`)
        )
    );

    router.post('/application/additionalInfo/*', (req, res) =>
      res
        .status(400)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header(
          'Access-Control-Allow-Methods',
          'GET, POST, HEAD, PUT, DELETE, OPTIONS'
        )
        .header('Access-Control-Allow-Credentials', true)
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./application/additionalInfo/error/test${req.params[0]}.json`)
        )
    );

    router.post('/user/loginByHash/', (req, res) =>
      res
        .status(200)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(require(`./user/loginByHash/${config.user.loginByHash}.json`))
    );

    router.post('/statistic/marker/', (req, res) =>
      res
        .status(200)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json(
          require(`./statistic/marker/${config.application.statistic.marker}.json`)
        )
    );

    router.post('/user/visitInformation/', (req, res) =>
      res
        .status(httpCode.userVisitInformation)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .header('Cache-Control', 'no-cache')
        .header('Last-Modified', new Date().toUTCString())
        .json(
          require(`./user/visitInformation/${config.user.visitInformation}.json`)
        )
    );

    router.post('/user/factor/', (req, res) =>
      res
        .status(200)
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .json({})
    );
    router.get('/utility/siteLogo', (req, res) => {
      var originCode = req.query
        ? req.query.originCode
        : '1eNLLYGCUVyn6WFk49IY';
      const fileName = `./utility/siteLogo/${originCode}.svg`;
      // res.status('200');
      // res.header('Accept', 'image/svg+xml');
      // res.header('X-Requested-With', 'XMLHttpRequest');
      // res.header('Access-Control-Allow-Origin', 'http://localhost:5555');
      // res.header('Access-Control-Allow-Credentials', true);
      // res.header('Access-Control-Allow-Methods', 'GET');
      //   res.header('Access-Control-Allow-Headers', 'responsetype, Content-Type');
      // res.header(
      //   'Access-Control-Allow-Headers',
      //   'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers, http://localhost:5555'
      // );
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.sendFile(fileName, { root: __dirname });
    });

    router.get('/application/loanProductLimit', (req, res) =>
      res
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .status(200)
        .json({
          minAutoPrice: 100000,
          maxAutoPrice: 1000000,
          minCreditSum: 500000,
          maxCreditSum: 700000,
          minFirstPayment: 2.2,
          maxFirstPayment: 9.2,
          minMonths: 24,
          maxMonths: 60
        })
    );

    router.get('/application/loanProduct', (req, res) =>
      res
        .header('Accept', 'application/json')
        .header('X-Requested-With', 'XMLHttpRequest')
        .header('Access-Control-Allow-Origin', 'http://localhost:5555')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Allow-Methods', 'GET')
        .header(
          'Access-Control-Allow-Headers',
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers'
        )
        .status(200)
        .json([
          {
            modelId: 2686,
            usedAuto: false,
            autoPrice: 1500000,
            firstPaymentSum: 500000,
            months: 36,
            manufactureYear: 2021,
            optimizationMethodCode: 'MIN_MONTHLY_PAYMENT',
            optimizationMethodName: 'Низкий платеж',
            loanProductParameterId: 1000,
            monthlyPayment: 12000,
            annualPercent: 10.5,
            residualCost: 2000,
            insurance: [
              {
                name: 'КАСКО',
                code: '001',
                insuranceId: 6873,
                term: 36
              },
              {
                name: 'СЖ',
                description: 'Место для вашего тултипа',
                code: '003',
                insuranceId: 6871,
                term: 38
              }
            ]
          },
          {
            modelId: 2686,
            usedAuto: false,
            autoPrice: 1500000,
            firstPaymentSum: 500000,
            months: 36,
            manufactureYear: 2021,
            optimizationMethodCode: 'MIN_PERCENT',
            optimizationMethodName: 'Низкая ставка',
            loanProductParameterId: 1000,
            monthlyPayment: 12000,
            annualPercent: 12.5,
            residualCost: 2000,
            insurance: [
              {
                name: 'GAP',
                code: '002',
                insuranceId: 6872,
                term: 37
              }
            ]
          },
          {
            modelId: 2686,
            usedAuto: false,
            autoPrice: 1500000,
            firstPaymentSum: 500000,
            months: 36,
            manufactureYear: 2021,
            optimizationMethodCode: 'MIN_WO_KASKO',
            optimizationMethodName: 'Без КАСКО',
            loanProductParameterId: 1000,
            monthlyPayment: 12000,
            annualPercent: 16.5,
            residualCost: 2000,
            insurance: [
              {
                name: 'КАСКО',
                code: '001',
                insuranceId: 6873,
                term: 36
              },
              {
                name: 'GAP',
                code: '002',
                insuranceId: 6872,
                term: 37
              }
            ]
          }
        ])
    );
  }
};

function getStatus(variant) {
  return variant.indexOf('error', 0) === -1 ? 200 : 400;
}

function jsonToQueryString(json) {
  return (
    '?' +
    Object.keys(json)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
      })
      .join('&')
  );
}
