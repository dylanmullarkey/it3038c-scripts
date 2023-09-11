#!/bin/bash
# This script downloads COVID data and displays it

DATA=$(curl https://api.covidtracking.com/v1/us/current.json)
POSITIVE=$(echo $DATA | jq '.[0].positive')
DEATHS=$(echo $DATA | jq '.[0].death')
HOSPITALIZED=$(echo $DATA | jq '.[0].hospitalizedCurrently')
NEGATIVE=$(echo $DATA | jq '.[0].negative')
TODAY=$(date)

echo "On $TODAY, there were $POSITIVE positive COVID cases, $NEGATIVE negative cases, $HOSPITALIZED currently hospitalized, and $DEATHS deaths."
