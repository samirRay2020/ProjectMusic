#!/bin/bash

all_task_prod () {
  result="$(aws ecs list-task-definitions --family-prefix $1 --query 'taskDefinitionArns')"
  len=$(echo "$result" | jq '. | length')
  for (( c=0; c<$len; c++ ))
  do 
    data=(echo "$result" | jq ".[$c]") 
    aws ecs update-service --cluster $2 --service $3 --task-definition $data
  done
}

specific_task () {
result="$(aws ecs describe-services --cluster $1 --service $2 --query 'services[].taskDefinition' | jq -r '.[0]')"
version=${result:0-1}
previousVersion=$(expr $version - 1)
result=${result/%$version/$previousVersion}

if [[ $previousVersion -ne 0 ]]
then 
    aws ecs update-service --cluster $1 --service $2 --task-definition $result
    echo "Version changed from " $version " to "  $previousVersion " successfully."
else
    echo "Version cannot be zero"
fi
}
