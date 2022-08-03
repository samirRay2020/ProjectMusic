#!/bin/bash
echo "Enter cluster name:"
read clusterName
echo "Enter service name:"
read serviceName

result="$(aws ecs describe-services --cluster $clusterName --service $serviceName --query 'services[].taskDefinition' | jq -r '.[0]')"
version=${result:0-1}
previousVersion=$(expr $version - 1)
result=${result/%$version/$previousVersion}

if [[ $previousVersion -ne 0 ]]
then 
    aws ecs update-service --cluster $clusterName --service $serviceName --task-definition $result
    echo "Version changed from " $version " to "  $previousVersion " successfully."
else
    echo "Version cannot be zero"
fi