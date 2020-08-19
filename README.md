# COVID-19 - Coronavirus cases tracker

## Background
The purpose of creating this tracker was to have a well-presented reliable and precise source for key statistics of the current COVID-19 situation. The project has been deployed as a githib page (https://roayahelal.github.io/covid-19/)

Please note that this project started during the first week of March and tracking has stopped in the first week of June.

![alt text](https://github.com/roayahelal/covid-19/blob/master/covid-19%20cases%20tracker%20code/screenshots/Screen%20Shot%202020-06-06%20at%205.21.07%20PM.png)
![alt text](https://github.com/roayahelal/covid-19/blob/master/covid-19%20cases%20tracker%20code/screenshots/Screen%20Shot%202020-05-25%20at%205.43.07%20AM.png)
![alt text](https://github.com/roayahelal/covid-19/blob/master/covid-19%20cases%20tracker%20code/screenshots/Screen%20Shot%202020-06-06%20at%205.22.53%20PM.png)
![alt text](https://github.com/roayahelal/covid-19/blob/master/covid-19%20cases%20tracker%20code/screenshots/Screen%20Shot%202020-06-06%20at%205.21.47%20PM.png)



### Data collection and preperation
* Data for the main page is scraped using Beautiful Soup from worldmeter.com, where caes are reported as aggreagates
* Data for the infection status page is from "https://pomber.github.io/covid19/timeseries.json" where cases are reported by dates

### Main findings

* Mortality rates speculations:
As the Pandamic started, it was reported by the news that the mortality rate is estimated to be less than 3%. In mid-March, When China had the highest cases globly, the weighted-average mortality rat as calculated here e was around 5% even though China has the biggest weight in this calculcation and had a mortality rate of around 3%. This indicated that there might be some ommited reportigs of cases in China. Later on as the spread globaly increased and crisises started to show in Italy and the US, those speculations in China's repirtings were one of the main topics in official news.

* Infection rates and imposed policies:
It seems that sevral countries do look at the growth rate when easing down lockdown restrictions. This was noticed sevral times for Bahrain and Japan; where the lockdown was lifted around the same time the infection rate as calculcated in this poroject became less than 1.

* Reported cases trends
In general, there is a lag in reporting cases, espcially on weekends. This is important to note as any assumpsions in infection rates or total deaths should consider looking at the day of the week for present biases.

### Global-Weighted-Average Mortality Rate

* Tech used: Python(Splinter, BeautifulSoup, Pandas), JavaScript

* Model / formula: Global-Weighted-Average = the sum of ((the current death rate of country n) x (country n's weight of number of cases))
the current death rate of country n = total deaths / total cases
country n's weight of number of cases = closed cases in country n / total closed cases (worldwide)
for all n in N = list of countries that have/had covid-19 cases

```
total_cases = df_used["TotalCases"].sum()
total_closed_cases = df_used["ClosedCases"].sum()
df_used["Weight"] = [x/total_closed_cases for x in df_used["ClosedCases"]]
# #checking if total weight is 1 
# validate_weight = df_used["Weight"].sum()
df_used["DeathRateXWeight"] = df_used["CurrentDeathRate"] *df_used["Weight"]
df_used["DeathRateXWeight"].sum() 
```

### Global cases heatmap

* Tech used: JavaScrip (Leaflet.js, D3.js)

* Model / formula: the circle radius depends on what bucket does number of cases for a given country fall under

### Top total new cases per country
* Tech used: JavaScript(Plotly.js)

* Model / formula: filtering-out total cases per country that are less than 2290


### Top total deaths per country 

* Tech used: JavaScript(Plotly.js)

* Model / formula: filtering-out total deaths per country that are less than 2290

### Global infection status 

* Tech used:Python, Tableau

* Model / formula: Infection Rate (for a given country) = Total new Cases today/ total new cases yesterday

Afterwards, the result along with historical total cases are used in a manualy designed decision tree to determine the analysis/ status of the infection rate in a given country. The decision tree was built to memic personal reasioning. The status buckes are as follows:

1)New to the pandamic

2)COVID-19 Spread Can Be Contained!

3)COVID-19 Spread is Possibly Getting Under Control!

4)COVID-19 Spread is Starting To Get Outta Hands!

5)COVID-19 Spread Has Gotten Out of Control!







