# COVID-19 - Coronavirus cases tracker

## Background
The purpose of creating this tracker was to have a well-presented reliable and precise source for key statistics of the current COVID-19 situation.
* Data collection and preperation: Data is scraped from worldmeter.com and cleanup is used using regex; example:

```corona_df["NewCases"].replace("\,","",regex = True, inplace = True)```

### Main findings

* Mortality rates speculations:

* Infection rates and imposed policies

* Reported cases trends

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

* Model / formula: the circle radius depends on what bucket do number of cases for a given country fall under, buckets and radiuses are as follows:
```
if (Cases < 10) {
      radius = 500;
    }
    else if (Cases >= 10 && Cases < 50) {
      radius = 700;
    }
    else if (Cases >=50  && Cases < 500) {
      radius = 1500;
    }
    else if (Cases >= 500 && Cases< 5000) {
      radius = 2000;
    }
    else if (Cases >= 5000 && Cases <10000) {
      radius = 3500;
    }

    else if (Cases >= 10000) {
        radius = 5000;
    }
  ```

### Top total new cases per country
* Tech used: JavaScript(Plotly.js)

* Model / formula: filtering-out total cases per country that are less than 2290


### Top total deaths per country 

* Tech used: JavaScript(Plotly.js)

* Model / formula: filtering-out total deaths per country that are less than 2290

### Global infection status 

* Tech used:

* Model / formula:





