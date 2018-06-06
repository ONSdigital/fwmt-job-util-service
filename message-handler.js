const fs = require('fs')
const leftPad = require('left-pad')
const request = require('request');
const createJobRequestFile = './messages/CreateJobRequest.txt'
const updateJobHeaderRequestFile = './messages/UpdateJobHeaderRequest.txt'
const deleteJobRequestFile = './messages/DeleteJobRequest.txt'

let handler = {
    newJobs: async function (jobType, tmUsernames, numberOfJobs, areaForJobs, world, tmServer, tmInstance, tmSecure, tmUsername, tmPassword) {
        return await new Promise((res, rej) => {
            fs.readFile(createJobRequestFile, function (err, data) {
                const id = require('./id-counter.json')
                if (err) throw err;
                let createJobRequestTemplate = data.toString()
                let addressFile = './data/addresses-'
                let workType
                let tmJobIdStub
                let currentId = id.count
                let additionalProperties = ''
                let worldReference
                let dueDate
                let tmPostURL
                let tla

                if (tmSecure) {
                    tmPostURL = 'https://' + tmServer + '/' + tmInstance + '/services/tm/v20/messaging/MessageQueueWs.asmx'
                } else {
                    tmPostURL = 'http://' + tmServer + '/' + tmInstance + '/services/tm/v20/messaging/MessageQueueWs.asmx'
                }

                switch (world) {
                    case 'MAN':
                        worldReference = 'Default'
                        break;
                    case 'MOD':
                        worldReference = 'MOD WORLD'
                        break;
                    default:
                        console.log('Invalid world was selected!')
                        return null
                }

                switch (jobType) {
                    case 'GFF':
                        workType = 'SS'
                        tmJobIdStub = 'O%QUOTA%-012-807'
                        dueDate = '2018-07-31T23:59:59'
                        tla = 'SLC'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Serno</ns5:Name><ns5:Value>Serno</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>TLA</ns5:Name><ns5:Value>TLA</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Week</ns5:Name><ns5:Value>Week</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Wave</ns5:Name><ns5:Value>Wave</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem1</ns5:Name><ns5:Value>Prem1</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem2</ns5:Name><ns5:Value>Prem2</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem3</ns5:Name><ns5:Value>Prem3</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem4</ns5:Name><ns5:Value>Prem4</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>District</ns5:Name><ns5:Value>District</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>PostTown</ns5:Name><ns5:Value>PostTown</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Postcode</ns5:Name><ns5:Value>Postcode</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Quota</ns5:Name><ns5:Value>Quota</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>AddressNo</ns5:Name><ns5:Value>AddressNo</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Year</ns5:Name><ns5:Value>Year</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Month</ns5:Name><ns5:Value>Month</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>ContactNo</ns5:Name><ns5:Value>ContactNo</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>GeoX</ns5:Name><ns5:Value>GeoX</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>GeoY</ns5:Name><ns5:Value>GeoY</ns5:Value></ns5:AdditionalProperty>'
                        break;
                    case 'LFS':
                        workType = 'SS'
                        tmJobIdStub = 'O%QUOTA% 9 7 2 1 1 1 - 82M'
                        dueDate = '2018-07-18T23:59:59'
                        tla = 'LFS'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Serno</ns5:Name><ns5:Value>Serno</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>TLA</ns5:Name><ns5:Value>TLA</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Week</ns5:Name><ns5:Value>Week</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Wave</ns5:Name><ns5:Value>Wave</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem1</ns5:Name><ns5:Value>Prem1</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem2</ns5:Name><ns5:Value>Prem2</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem3</ns5:Name><ns5:Value>Prem3</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Prem4</ns5:Name><ns5:Value>Prem4</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>District</ns5:Name><ns5:Value>District</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>PostTown</ns5:Name><ns5:Value>PostTown</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Postcode</ns5:Name><ns5:Value>Postcode</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Quota</ns5:Name><ns5:Value>Quota</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>AddressNo</ns5:Name><ns5:Value>AddressNo</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Year</ns5:Name><ns5:Value>Year</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Month</ns5:Name><ns5:Value>Month</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>ContactNo</ns5:Name><ns5:Value>ContactNo</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>GeoX</ns5:Name><ns5:Value>GeoX</ns5:Value></ns5:AdditionalProperty>'
                        additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>GeoY</ns5:Name><ns5:Value>GeoY</ns5:Value></ns5:AdditionalProperty>'
                        break;
                    case 'HH':
                        workType = 'HH'
                        tmJobIdStub = 'Census-O%QUOTA%'
                        dueDate = '2018-07-31T23:59:59'
                        tla = 'Census'
                        // additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Serno</ns5:Name><ns5:Value>Serno</ns5:Value></ns5:AdditionalProperty>'
                        break;
                    case 'CCS':
                        workType = 'CCS'
                        tmJobIdStub = 'Census-O%QUOTA%'
                        dueDate = '2018-07-31T23:59:59'
                        tla = 'CCS'
                        // additionalProperties = additionalProperties + '<ns5:AdditionalProperty><ns5:Name>Serno</ns5:Name><ns5:Value>Serno</ns5:Value></ns5:AdditionalProperty>'
                        break;
                    default:
                        console.log('Invalid job type was selected!')
                        return null
                }

                switch (areaForJobs) {
                    case 'Mid':
                        addressFile = addressFile + 'mid.json'
                        break;
                    case 'North':
                        addressFile = addressFile + 'north.json'
                        break;
                    case 'East':
                        addressFile = addressFile + 'east.json'
                        break;
                    case 'South':
                        addressFile = addressFile + 'south.json'
                        break;
                    case 'West':
                        addressFile = addressFile + 'west.json'
                        break;
                    default:
                        console.log('Invalid area for jobs was selected!')
                        return null
                }

                const addresses = require(addressFile)

                let tmUNames = []
                if (tmUsernames.indexOf(',') != -1) {
                    tmUNames = tmUsernames.split(',')
                } else {
                    tmUNames.push(tmUsernames)
                }

                let successfulIds = []

                for (var c = 0; c < tmUNames.length; c++) {
                    tmUNames[c] = tmUNames[c].trim()
                    // addresses.addresses.forEach((address, i) => {
                    for(let i=0;i<numberOfJobs;i++){
                            let createJobRequest = createJobRequestTemplate
                            let tmJobId = tmJobIdStub.replace(/%QUOTA%/g, leftPad(currentId, 5, 0))
                            currentId++
                            let addressLines = ''

                            if (address.line1) {
                                addressLines = addressLines + '<ns3:AddressLine>' + address.line1 + '</ns3:AddressLine>'
                                if (address.line2) {
                                    addressLines = addressLines + '<ns3:AddressLine>' + address.line2 + '</ns3:AddressLine>'
                                    if (address.line3) {
                                        addressLines = addressLines + '<ns3:AddressLine>' + address.line3 + '</ns3:AddressLine>'
                                        if (address.line4) {
                                            addressLines = addressLines + '<ns3:AddressLine>' + address.line4 + '</ns3:AddressLine>'
                                        }
                                    }
                                }
                            }

                            createJobRequest = createJobRequest.replace(/%%TLA%%/g, tla)
                            createJobRequest = createJobRequest.replace(/%%DUEDATE%%/g, dueDate)
                            createJobRequest = createJobRequest.replace(/%%REFERENCE%%/g, tmJobId)
                            createJobRequest = createJobRequest.replace(/%%ADDRESS%%/g, addressLines)
                            createJobRequest = createJobRequest.replace(/%%POSTCODE%%/g, address.postcode)
                            createJobRequest = createJobRequest.replace(/%%WORKTYPE%%/g, workType)
                            createJobRequest = createJobRequest.replace(/%%USERNAME%%/g, tmUNames[c])
                            createJobRequest = createJobRequest.replace(/%%ADDITIONAL%%/g, additionalProperties)
                            createJobRequest = createJobRequest.replace(/%%WORLD%%/g, worldReference)

                            let auth = 'Basic ' + new Buffer(tmUsername + ':' + tmPassword).toString('base64')

                            await request({
                                headers: {
                                    'SOAPAction': 'http://schemas.consiliumtechnologies.com/wsdl/mobile/2007/07/messaging/SendCreateJobRequestMessage',
                                    'Content-Type': 'text/xml',
                                    'Authorization': auth
                                },
                                uri: tmPostURL,
                                body: createJobRequest,
                                method: 'POST'
                            }, function (err, res, body) {
                                successfulIds.push(tmJobId)
                                console.log(body)
                            });
                    }
                }
                // UPDATE CURRENT COUNTER
                fs.writeFileSync('id-counter.json', JSON.stringify({
                    "count": currentId
                }))
                // console.log(successfulIds)
                res(successfulIds)
            })
        })
    },
    reallocations: async function (tmJobIds, allocatedTo, tmServer, tmInstance, tmSecure, tmUsername, tmPassword) {
        return await new Promise((res, rej) => {
            fs.readFile(updateJobHeaderRequestFile, function (err, data) {
                if (err) throw err;

                let tmPostURL
                if (tmSecure) {
                    tmPostURL = 'https://' + tmServer + '/' + tmInstance + '/services/tm/v20/messaging/MessageQueueWs.asmx'
                } else {
                    tmPostURL = 'http://' + tmServer + '/' + tmInstance + '/services/tm/v20/messaging/MessageQueueWs.asmx'
                }

                let updateJobHeaderRequestTemplate = data.toString()
                allocatedTo = allocatedTo.trim()
                let tmJIds = []
                if (tmJobIds.indexOf(',') != -1) {
                    tmJIds = tmJobIds.split(',')
                } else {
                    tmJIds.push(tmJobIds)
                }

                for (var c = 0; c < tmJIds.length; c++) {
                    tmJIds[c] = tmJIds[c].trim()
                    let updateJobHeaderRequest = updateJobHeaderRequestTemplate

                    updateJobHeaderRequest = updateJobHeaderRequest.replace(/%%JOBID%%/g, tmJIds[c])
                    updateJobHeaderRequest = updateJobHeaderRequest.replace(/%%USERNAME%%/g, allocatedTo)

                    let auth = 'Basic ' + new Buffer(tmUsername + ':' + tmPassword).toString('base64')

                    request({
                        headers: {
                            'SOAPAction': 'http://schemas.consiliumtechnologies.com/wsdl/mobile/2007/07/messaging/SendUpdateJobHeaderRequestMessage',
                            'Content-Type': 'text/xml',
                            'Authorization': auth
                        },
                        uri: tmPostURL,
                        body: updateJobHeaderRequest,
                        method: 'POST'
                    }, function (err, res, body) {
                        console.log(body)
                    });
                }
                res('finished')
            })
        })
    },
    deletions: async function (tmJobIds, tmServer, tmInstance, tmSecure, tmUsername, tmPassword) {
        return await new Promise((res, rej) => {
            fs.readFile(deleteJobRequestFile, function (err, data) {
                if (err) throw err;

                let tmPostURL
                if (tmSecure) {
                    tmPostURL = 'https://' + tmServer + '/' + tmInstance + '/services/tm/v20/messaging/MessageQueueWs.asmx'
                } else {
                    tmPostURL = 'http://' + tmServer + '/' + tmInstance + '/services/tm/v20/messaging/MessageQueueWs.asmx'
                }

                let deleteJobRequestTemplate = data.toString()
                let tmJIds = []
                if (tmJobIds.indexOf(',') != -1) {
                    tmJIds = tmJobIds.split(',')
                } else {
                    tmJIds.push(tmJobIds)
                }

                for (var c = 0; c < tmJIds.length; c++) {
                    tmJIds[c] = tmJIds[c].trim()
                    let deleteJobRequest = deleteJobRequestTemplate

                    deleteJobRequest = deleteJobRequest.replace(/%%JOBID%%/g, tmJIds[c])

                    let auth = 'Basic ' + new Buffer(tmUsername + ':' + tmPassword).toString('base64')

                    request({
                        headers: {
                            'SOAPAction': 'http://schemas.consiliumtechnologies.com/wsdl/mobile/2007/07/messaging/SendDeleteJobRequestMessage',
                            'Content-Type': 'text/xml',
                            'Authorization': auth
                        },
                        uri: tmPostURL,
                        body: deleteJobRequest,
                        method: 'POST'
                    }, function (err, res, body) {
                        console.log(body)
                    });
                }
                res('finished')
            })
        })
    }
}

module.exports = handler

async function lel(){
    console.log(await handler.newJobs('CCS', 'james.berry', 1, 'Mid', 'MAN', 'ons-dev.totalmobile-cloud.com', 'Test', true, 'james.berry', 'Pass!123'))
}
lel()