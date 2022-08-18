#!/bin/bash

if [[ $3 == "rollback" ]]
then
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
else if [[ $3 == "restart" ]]
    result="$(aws ecs describe-services --cluster $1 --service $2 --query 'services[].taskDefinition' | jq -r '.[0]')"
    version=${result:0-1}
#     previousVersion=$(expr $version - 1)
#     result=${result/%$version/$previousVersion}

    if [[ $version -ne 0 ]]
    then 
        aws ecs update-service --cluster $1 --service $2 --task-definition $result
    else
        echo "Version cannot be zero"
    fi
fi


