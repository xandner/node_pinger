const fs = require('fs');
var ping = require('ping');
const domain = require('getdomain')
var geoip = require('geoip-country');
const Excel = require('exceljs')
let workbook = new Excel.Workbook()
let worksheet = workbook.addWorksheet('sites')
worksheet.columns = [
    {header: 'site url', key: 'siteURL'},
    {header: 'site ip', key: 'siteIP'},
    {header: 'country', key: 'country'}
]

let sites = fs.readFileSync('./json.json', "UTF-8");
const j_sites=JSON.parse(sites)
j_sites.forEach(function (site) {
    var siteLink= domain.get(site.link)
    ping.promise.probe(siteLink)
        .then(res=>{
            var host=res.numeric_host
            var geo = geoip.lookup(host);
            worksheet.addRow({siteURL:siteLink,siteIP:host,country:geo.country})
            workbook.xlsx.writeFile('sites.xlsx')
        })


})


