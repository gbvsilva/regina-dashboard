import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
//import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Chart from "react-google-charts";
import axios from 'axios';
//import { CardContent } from "@material-ui/core";
//import mysql from 'mysql';

const useStyles = makeStyles(styles);

const options1 = {
  width: 100, height: 100,
  min: 0, max: 300,
  redFrom: 0, redTo: 150,
  yellowFrom:150, yellowTo: 175,
  greenFrom: 175, greenTo: 250,
  minorTicks: 5
};
const options2 = {
  width: 100, height: 100,
  min: 0, max: 45000,
  greenFrom: 0, greenTo: 40000,
  yellowFrom: 40000, yellowTo: 42500,
  redFrom: 42500, redTo: 45000,
  minorTicks: 5
};
const options3 = {
  width: 100, height: 100,
  min: 0, max: 150,
  greenFrom: 0, greenTo: 140,
  yellowFrom: 140, yellowTo: 145,
  redFrom: 145, redTo: 150,
  minorTicks: 5
};

const headers={"fiware-service": "openiot", "fiware-servicepath": "/"};
var corrente, tensao, potencia;
var entityID = 'IoTSmartReginaLabDC';

export async function getData() {
  try {
    const response = await axios({
      "method": "get",
      "url": "http://10.7.229.35:1026/v2/entities/"+entityID,
      "headers": headers
    });
    tensao = response.data.Tensao_V.value;
    potencia = response.data.Pot_Ativa_W.value;
    corrente = response.data.Corrente_A.value;
    
    console.log("Tensao: "+tensao+"\nPotencia: "+potencia+"\nCorrente: "+corrente);
  }
  catch(error) {
    console.log(error);
  }
}

var getTensao = () => {
  return [
    ["Label", "Value"],
    ["Tensão", tensao]
  ];
};

var getPotencia = () => {
  return [
    ["Label", "Value"],
    ["Potência", potencia]
  ];
}

var getCorrente = () => {
  return [
    ["Label", "Value"],
    ["Corrente", corrente]
  ];
}

/*function drawGauges() {
 
}*/

export default function Dashboard() {
  const classes = useStyles();
  getData();
  /*const conn = mysql.createConnection({
    host: "10.7.229.35",
    user: "root",
    password: "123",
    database: "openiot"
  });
  conn.connect(function(err) {
    (err) ? console.log(err) : console.log(conn);
  });*/

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardBody>
              <Chart
                chartType="Gauge"
                width="100%"
                height="100px"
                data={getTensao()}
                options={options1}
                />
            </CardBody>
            <CardFooter stats>
            <div className={classes.stats}>
              <h5>Tensão</h5>
            </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardBody>
              <Chart
                chartType="Gauge"
                width="100%"
                height="100px"
                data={getPotencia()}
                options={options2}>
              </Chart>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <h5>Potência</h5>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardBody>
              <Chart
                chartType="Gauge"
                width="100%"
                height="100px"
                data={getCorrente()}
                options={options3}>
              </Chart>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <h5>Corrente</h5>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
