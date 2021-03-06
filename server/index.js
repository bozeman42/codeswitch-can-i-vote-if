var seed;
if(process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config(); // environment variables, used for hiding secrets
  seed = require('seedquelize')
}

var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Connect to a sql database
if(process.env.NODE_ENV == 'production') {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
  });
} else {
  var sequelize = new Sequelize(process.env.DATABASE_URL_DEV, {
    dialect: 'postgres',
    protocol: 'postgres',
  });
}

// We need to define models. A model describes the structure of
// something that we want to store in the database. On each model
// we define each of the fields on that model. We can also decide
// to have different internal and external field names. Internal
// fields would be the column names in the database, external are
// what you would use in your code.

//Define States
const States = sequelize.define('states', {
  name: {
    type: Sequelize.STRING,
		field: 'name'
  },
  age: {
		type: Sequelize.STRING(1000),
		field: 'age'
  },
  citizenship: {
		type: Sequelize.STRING(1000),
		field: 'citizenship',
	},
	residency: {
		type: Sequelize.STRING(1000),
		field: 'residency',
	},
	criminalHistory: {
		type: Sequelize.STRING(1000),
		field: 'criminalHistory',
	},
	competence: {
		type: Sequelize.STRING(1000),
		field: 'competence',
	},
	other: {
		type: Sequelize.STRING(1000),
		field: 'other',
	},
}, {
  freezeTableName: true
});

// THIS IS THE DON'T GET FIRED CLAUSE
// Seeding (or preloading) your database gives it dummy data
// so that development isn't a graveyard. In production we
// probably don't want to delete the entire database :)
//
if(process.env.NODE_ENV !== 'production') {
  sequelize.sync({force: true}).then(() => {

    // Some sample projects
    var states = {
			data: [ 
      {
        name: 'Alabama',
        age: 'You must be 18 years old before any election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Alabama and your county at the time of registration',
        criminalHistory: 'You must not have been convicted of a felony punishable by imprisonment in the penitentiary (or have had your civil and political rights restored)',
        competence: 'You must not currently be declared mentally incompetent through a competency hearing',
        other: 'You must swear or affirm to “support and defend the Constitution of the US and the State of Alabama and further disavow any belief or affiliation with any group which advocates the overthrow of the governments of the US or the State of Alabama by unlawful means and that the information contained herein is true, so help me God”' },
      {
        name: 'Alaska',
        age: 'You must be at least 18 years old within 90 days of completing this registration',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Alaska',
        criminalHistory: 'You must not be a convicted felon (unless unconditionally discharged)',
        competence: 'There is no competence requirement',
        other: 'You must not be registered to vote in another state' },
      {
        name: 'Arizona',
        age: 'You must be 18 years old on or before the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Arizona and your county at least 29 days preceding the next election',
        criminalHistory: 'You must not have been convicted of treason or a felony (or have had your civil rights restored)',
        competence: 'You must not currently be declared an incapacitated person by a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Arkansas',
        age: 'You must be at least 18 years old before the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must live in Arkansas at the address in Box 2 on the application AND not claim the right to vote in any other jurisdiction',
        criminalHistory: 'You must not be a convicted felon (or have completely discharged your sentence or been pardoned)',
        competence: 'You must not previously be adjudged mentally incompetent by a court of competent jurisdiction',
        other: 'There is no other requirement' },
      {
        name: 'California',
        age: 'You must be at least 18 years of age at the time of the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of California',
        criminalHistory: 'You must not be imprisoned or on parole for the conviction of a felony',
        competence: 'You must not currently be judged mentally incompetent by a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Colorado',
        age: 'You must be 18 years old on or before Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Colorado 30 days prior to Election Day',
        criminalHistory: 'You must not be confined as a prisoner or serving any part of a sentence under mandate',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Connecticut',
        age: 'You must be 17 years old. You can vote when you turn 18.',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Connecticut and of the town in which you wish to vote',
        criminalHistory: 'You must have completed confinement and parole if previously convicted of a felony, and have had your voting rights restored by Registrars of Voters',
        competence: 'You must not currently be declared mentally incompetent to vote by a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Delaware',
        age: 'You must be at least 18 years old on the date of the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Delaware',
        criminalHistory: 'Felons are eligible to vote if certain requirements are met: fines and sentence completed at least five years prior to application date; felony convictions can not be disqualifying felonies, which are murder, sexual offenses, or crimes against public administration involving bribery or improper influence or abuse of office',
        competence: 'You must not be mentally incompetent',
        other: 'There is no other requirement' },
      {
        name: 'District of Columbia',
        age: 'You must be at least 18 years old on or preceding the next election not be in jail for a felony conviction',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of District of Columbia for at least 30 days preceding the next election AND not claim the right to vote anywhere outside DC',
        criminalHistory: 'There is no criminal history requirement',
        competence: 'You must not have been judged “mentally incompetent” by a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Florida',
        age: 'You must be 18 years old (you may pre‑register if you are at least 16)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of both the State of Florida and of the county in which you seek to be registered',
        criminalHistory: 'You must not be a convicted felon, or if you are, you must first have your civil rights restored if they were taken away',
        competence: 'You must not be adjudicated mentally incapacitated with respect to voting in Florida or any other State, or if you have, you must first have your voting rights restored',
        other: 'You must swear or affirm the following: “I will protect and defend the Constitution of the United States and the Constitution of the State of Florida, that I am qualified to register as an elector under the Constitution and laws of the State of Florida, and that all information in this application is true.”' },
      {
        name: 'Georgia',
        age: 'You must be 18 years old within six months after the day of registration, and be 18 years old to vote',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of both Georgia and the county in which you want to vote',
        criminalHistory: 'You must not be serving a sentence for having been convicted of a felony',
        competence: 'You must not have been judicially determined to be mentally incompetent, unless the disability has been removed',
        other: 'There is no other requirement' },
      {
        name: 'Hawaii',
        age: 'You must be at least 16 years old (you must be 18 years old by Election Day in order to vote)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of the State of Hawaii',
        criminalHistory: 'You must not be incarcerated for a felony conviction',
        competence: 'You must not be adjudicated by a court as “non compos mentis”',
        other: 'There is no other requirement' },
      {
        name: 'Idaho',
        age: 'You must be at least 18 years old',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must have resided in Idaho and in the county for 30 days prior to the day of election',
        criminalHistory: 'You must not have been convicted of a felony, and without having been restored to the rights of citizenship, or confined in prison on conviction of a criminal offense',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Illinois',
        age: 'You must be at least 18 years old on or before the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Illinois and of your election precinct at least 30 days before the next election AND not claim the right to vote anywhere else',
        criminalHistory: 'You must not be in jail for a felony conviction',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Indiana',
        age: 'You must be at least 18 years of age on the day of the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must have resided in the precinct at least 30 days before the next election',
        criminalHistory: 'You must not currently be in jail for a criminal conviction',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Iowa',
        age: 'You must be at least 17‑1/2 years old (you must be 18 to vote)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Iowa AND give up your right to vote in any other place',
        criminalHistory: 'You must not have been convicted of a felony (or have had your rights restored)',
        competence: 'You must not currently be judged by a court to be “incompetent to vote”',
        other: 'There is no other requirement' },
      {
        name: 'Kansas',
        age: 'You must be 18 by the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Kansas AND not claim the right to vote in any other location or under any other name',
        criminalHistory: 'You must have completed the terms of your sentence if convicted of a felony; a person serving a sentence for a felony conviction is ineligible to vote',
        competence: 'You must not be excluded from voting for mental incompetence by a court of competent jurisdiction',
        other: 'There is no other requirement' },
      {
        name: 'Kentucky',
        age: 'You must be 18 years of age on or before the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Kentucky AND be a resident of the county for at least 28 days prior to Election Day date AND not claim the right to vote anywhere outside Kentucky',
        criminalHistory: 'You must not be a convicted felon or if you have been convicted of a felony, your civil rights must have been restored by executive pardon',
        competence: 'You must not have been judged “mentally incompetent” in a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Louisiana',
        age: 'You must be at least 17 years old, and be 18 years old prior to the next election to vote',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Louisiana (Residence address must be address where you claim homestead exemption, if any, except for a resident in a nursing home or veteran’s home who may select to use the address of the nursing home or veterans’ home or the home where he has a homestead exemption. A college student may elect to use his home address or his address while away at school.)',
        criminalHistory: 'You must not currently be under an order of imprisonment for conviction of a felony',
        competence: 'You must not currently be under a judgment of interdiction for mental incompetence',
        other: 'There is no other requirement' },
      {
        name: 'Maine',
        age: 'You must be at least 17 years old (you must be 18 years old to vote)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Maine and the municipality in which you want to vote',
        criminalHistory: 'There is no criminal history requirement',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Maryland',
        age: 'You must be at least 18 years old by the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Maryland',
        criminalHistory: 'You must not have been convicted of a felony, or if you have, you have completed serving a court ordered sentence of imprisonment, including any term of parole or probation for the conviction AND not have been convicted of buying or selling votes',
        competence: 'You must not be under guardianship for mental disability',
        other: 'There is no other requirement' },
      {
        name: 'Massachusetts',
        age: 'You must be 18 years old on or before the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Massachusetts',
        criminalHistory: 'You must not be currently incarcerated for a felony conviction AND not have been convicted of corrupt practices in respect to elections',
        competence: 'You must not be under guardianship with respect to voting',
        other: 'There is no other requirement' },
      {
        name: 'Michigan',
        age: 'You must be 18 years old by the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Michigan and at least a 30 day resident of your city or township by Election Day',
        criminalHistory: 'You must not be confined in a jail after being convicted and sentenced',
        competence: 'There is no competence requirement',
        other: 'Warning: Michigan law requires that the same address be used for voter registration and driver license purposes. Therefore, if the residence address you provide on this form differs from the address shown on a driver license or personal identification card issued by the State of Michigan, the Secretary of State will automatically change your driver license or personal identification card address to match the residence address entered on your voter registration form. If an address change is made, the Secretary of State will mail you an address update sticker for your driver license or personal identification card.' },
      {
        name: 'Minnesota',
        age: 'You must be at least 18 years old on Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Minnesota for 20 days before the next election AND maintain residence at the address given on the registration form',
        criminalHistory: 'If previously convicted of a felony, your felony sentence must have expired or been completed, or you must have been discharged from the sentence',
        competence: 'You must not be found by a court to be legally incompetent to vote AND not be under a court‑ordered guardianship in which the right to vote has been revoked',
        other: 'There is no other requirement' },
      {
        name: 'Mississippi',
        age: 'You must be 18 years old by the time of the general election in which you want to vote',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must have lived in Mississippi and in your county (and city, if applicable) 30 days before Election Day in which you want to vote',
        criminalHistory: 'You must have not been convicted of murder, rape, bribery, theft, arson, obtaining money or goods under false pretense, perjury, forgery, embezzlement, armed robbery, extortion, felony bad check, felony shoplifting, larceny, receiving stolen property, robbery, timber larceny, unlawful taking of a motor vehicle, statutory rape, carjacking, or bigamy, or have had your rights restored as required by law',
        competence: 'You must not have been declared mentally incompetent by a court',
        other: 'There is no other requirement' },
      {
        name: 'Missouri',
        age: 'You must be at least 17‑1/2 years of age (you must be 18 to vote)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Missouri',
        criminalHistory: 'You must not be confined under a sentence of imprisonment AND not be convicted of a felony or misdemeanor connected with the right of suffrage AND not be on probation or parole after conviction of a felony, until finally discharged from such probation or parole',
        competence: 'You must not be adjudged incapacitated by any court of law',
        other: 'There is no other requirement' },
      {
        name: 'Montana',
        age: 'You must be at least 18 years old on or before Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Montana and of the county in which you want to vote for at least 30 days before the next election',
        criminalHistory: 'You must not be in a penal institution for a felony conviction',
        competence: 'You must not currently be determined by a court to be of unsound mind',
        other: 'You must meet these qualifications by the next Election Day if you do not currently meet them' },
      {
        name: 'Nebraska',
        age: 'You must be at least 18 years of age or will be 18 years of age on or before the first Tuesday after the first Monday of Nov',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Nebraska',
        criminalHistory: 'You must not have been convicted of a felony, or if convicted, have had your civil rights restored',
        competence: 'You must not have been officially found to be mentally incompetent',
        other: 'There is no other requirement' },
      {
        name: 'Nevada',
        age: 'You must have attained the age of 18 years on the date of the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must have continuously resided in the State of Nevada, in your county, at least 30 days and in your precinct at least 10 days before the next election',
        criminalHistory: 'You must have your civil rights restored if you were convicted of a felony',
        competence: 'You must not be determined by a court of law to be mentally incompetent',
        other: 'You must claim no other place as your legal residence' },
      {
        name: 'New Hampshire',
        age: 'You must be 18 years of age or older on Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'Register to vote only in the town or ward in which you actually live',
        criminalHistory: 'You must not be currently incarcerated. If you are on parole or on probation, you can vote, but must re-register first',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'New Jersey',
        age: 'You must be at least 18 years of age by the time of the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of this State and county at your address at least 30 days before the next election',
        criminalHistory: 'You must not be serving a sentence or on parole or probation as the result of a conviction of any indictable offense under the laws of this or another state or of the United States',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'New Mexico',
        age: 'You must be 18 years of age at the time of the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of the State of New Mexico',
        criminalHistory: 'If you have been convicted of a felony, you must have completed all conditions of probation or parole, served the entirety of a sentence or have been granted a pardon by the Governor',
        competence: 'You must not have been denied the right to vote by a court of law by reason of mental incapacity',
        other: 'There is no other requirement' },
      {
        name: 'New York',
        age: 'You must be 18 years old by December 31 of the year in which you file this form (Note: You must be 18 years old by the date of the general, primary, or other election in which you want to vote)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of the county of New York for at least 30 days before Election Day AND not claim the right to vote elsewhere',
        criminalHistory: 'You must not be in jail or on parole for a felony conviction',
        competence: 'You must not currently be judged incompetent by order of a court of competent judicial authority',
        other: 'There is no other requirement' },
      {
        name: 'North Carolina',
        age: 'You must be 18 years of age by the day of the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of North Carolina and the county in which you live for at least 30 days prior to Election Day AND not be registered or vote in any other county or state',
        criminalHistory: 'You must have your rights of citizenship restored if you have been convicted of a felony',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'North Dakota',
        age: 'You must be at least 18 years old on the day of election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of North Dakota and reside in the precinct for 30 days preceding Election Day',
        criminalHistory: 'You must not be currently incarcerated',
        competence: 'There is no competence requirement',
        other: 'You must be able to provide a drivers license, non-driver identification card or other approved form of identification' },
      {
        name: 'Ohio',
        age: 'You must be at least 18 years old on or before the next general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Ohio for at least 30 days immediately before the election in which you want to vote.',
        criminalHistory: 'You must not be currently incarcerated (in jail or prison) for a felony conviction. If you are an ex-felon and not currently incarcerated, you CAN register to vote in Ohio.',
        competence: 'You must not been declared incompetent for voting purposes by a probate court',
        other: 'You must not been permanently denied the right to vote for violations of election laws' },
      {
        name: 'Oklahoma',
        age: 'You must be 18 years old on or before the date of the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of the State of Oklahoma',
        criminalHistory: 'You must have not been convicted of a felony, for which a period of time equal to the original sentence has not expired, or for which you have not been pardoned',
        competence: 'You must not now be under judgment as an incapacitated person, or a partially incapacitated person prohibited from registering to vote',
        other: 'There is no other requirement' },
      {
        name: 'Oregon',
        age: 'You must be at least 18 years old by Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Oregon',
        criminalHistory: 'You must not be currently incarcerated',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Pennsylvania',
        age: 'You must be at least 18 years of age on the day of the next election',
        citizenship: 'You must be a citizen of the United States at least one month before the next election',
        residency: 'You must be a resident of Pennsylvania and your election district at least 30 days before Election Day',
        criminalHistory: 'You must not be currently incarcerated. If you are on parole or on probation, you can vote, but must re-register first',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Rhode Island',
        age: 'You must be 18 years old by Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Rhode Island for 30 days preceding the next election',
        criminalHistory: 'You must not be currently incarcerated in a correctional facility due to a felony conviction',
        competence: 'You must not have been lawfully judged to be mentally incompetent',
        other: 'There is no other requirement' },
      {
        name: 'South Carolina',
        age: 'You must be at least 18 years old on or before the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of South Carolina, your county and precinct not be confined in any public prison resulting from a conviction of a crime AND claim the address on the application as your only legal place of residence and claim no other place as your legal residence',
        criminalHistory: 'You must never have been convicted of a felony or offense against Election Day laws, or if previously convicted, have served your entire sentence, including probation or parole, or have received a pardon for the conviction',
        competence: 'You must not be under a court order declaring you mentally incompetent',
        other: 'There is no other requirement' },
      {
        name: 'South Dakota',
        age: 'You must be 18 years old by the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must reside in South Dakota',
        criminalHistory: 'You must not be currently serving a sentence for a felony conviction which included imprisonment, served or suspended, in an adult penitentiary system',
        competence: 'You must not have been adjudged mentally incompetent by a court',
        other: 'There is no other requirement' },
      {
        name: 'Tennessee',
        age: 'You must be at least 18 years old on or before the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Tennessee',
        criminalHistory: 'You must not have been convicted of a felony, or if convicted, have had your full rights of citizenship restored (or have received a pardon)',
        competence: 'You must not be adjudicated incompetent by a court of competent jurisdiction (or have been restored to legal capacity)',
        other: 'There is no other requirement' },
      {
        name: 'Texas',
        age: 'You must be at least 17 years and 10 months old (you must be 18 to vote)',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of the county in which the application for registration is made',
        criminalHistory: 'You must not be finally convicted of a felony, or if a convicted felon, have fully discharged your punishment, including any incarceration, parole, supervision, period of probation, or be pardoned',
        competence: 'You must have not been declared mentally incompetent by final judgment of a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Utah',
        age: 'You must be at least 18 years old on or before the next election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must have resided in Utah for 30 days immediately before the next election',
        criminalHistory: 'You must not be a convicted felon currently incarcerated for commission of a felony OR not be convicted of treason or crime against the elective franchise, unless restored to civil rights',
        competence: 'You must not be found to be mentally incompetent by a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Vermont',
        age: 'You must be 18 years of age on or before Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Vermont',
        criminalHistory: 'There is no criminal history requirement',
        competence: 'There is no competence requirement',
        other: 'You must have taken the following Oath: You solemnly swear (or affirm) that whenever you give your vote or suffrage, touching any matter that concerns the state of Vermont, you will do it so as in your conscience you shall judge will most conduce to the best good of the same, as established by the Constitution, without fear or favor of any person [Voter’s Oath, Vermont Constitution, Chapter II, Section 42]' },
      {
        name: 'Virginia',
        age: 'You must be 18 years old by the next May or Nov general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Virginia and of the precinct in which you want to vote',
        criminalHistory: 'You must not have been convicted of a felony, or have had your civil rights restored',
        competence: 'You must not currently be declared mentally incompetent by a court of law',
        other: 'There is no other requirement' },
      {
        name: 'Washington',
        age: 'You must be at least 18 years old by Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of Washington State, your county and precinct for 30 days immediately preceding Election Day in which you want to vote',
        criminalHistory: 'You must not be convicted of infamous crime, unless restored to civil rights',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'West Virginia',
        age: 'You must be 18 years old, or to vote in the primary be 17 years old and turning 18 before the general election',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must live in West Virginia at the above address',
        criminalHistory: 'You must not be under conviction, probation, or parole for a felony, treason or election bribery',
        competence: 'You must not have been judged “mentally incompetent” in a court of competent jurisdiction',
        other: 'There is no other requirement' },
      {
        name: 'Wisconsin',
        age: 'You must be 18 years old',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must claim the address on the application as your only legal place of residence and claim no other place as your legal residence',
        criminalHistory: 'You must not have been convicted of treason, felony or bribery, or if you have, your civil rights have been restored',
        competence: 'There is no competence requirement',
        other: 'There is no other requirement' },
      {
        name: 'Wyoming',
        age: 'You must be 18 years of age by General Election Day',
        citizenship: 'You must be a citizen of the United States',
        residency: 'You must be a resident of the State of Wyoming',
        criminalHistory: 'You must not have been convicted of a felony, unless voting rights restored',
        competence: 'You must not be currently adjudicated mentally incompetent',
        other: 'There is no other requirement' } ]
    ,
      model: States
    };

    seed([
      states
    ]).then(() =>{
      startExpress();
    });

  });

} else {
  startExpress();
}

function startExpress() {

  // Create a new express app to server our api
  var app = express()

  // Teach express how to parse requests of type application/json
  app.use(bodyParser.json());

  // Teach express how to parse requests of type application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // OTHER ROUTES USING SEQUELIZE HERE

  // --------------STATES-------------------------

  // Get all states
  app.get('/api/states', (req, res) => {
    // Find all states
		States.findAll().then((states) => {
			res.header("Access-Control-Allow-Origin", "*")
			res.json(states);
    }).catch(err => {
      console.log(err);
    })
	});
	
	// Get all states
	app.get('/api/states/:name', (req, res) => {
		// Find all States
		States.findAll({
			where: {
				name: req.params.name,
			}
		}).then((currentState) => {
			res.header("Access-Control-Allow-Origin", "*")
			res.json(currentState);
		}).catch(err => {
			console.log(err);
		})
	});

  // Determine which port to listen on
  var port = process.env.PORT ? process.env.PORT : 3001

  // Actually start the server
  app.listen(port, () => {
    console.log('Example app listening on port ' + port + '!')
  })
}