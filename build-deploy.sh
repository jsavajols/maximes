docker  build -f ./Dockerfile -t maximes .

docker tag maximes:latest rg.fr-par.scw.cloud/funcscwjeromet1q1hfov/maximes:latest
docker push rg.fr-par.scw.cloud/funcscwjeromet1q1hfov/maximes:latest

kubectl rollout restart -n default deployment maximes