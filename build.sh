#!/bin/sh
set -v on

export module_name=sasc-cherry-explorer
export cache_base="/secondDisk/sasc-cherry/cache/"$module_name

echo "****设置node_modules缓存......"
export nodeCachePath=$cache_base"/node_modules"
echo $nodeCachePath
mkdir -p $nodeCachePath

echo "****进行缓存......"
docker run --rm -v $PWD:/source -v $nodeCachePath:/source/node_modules -w /source node:10.24.1 bash -c "yarn install"

echo "****开始编译......"
docker run --rm -w /source -v $PWD:/source -v $nodeCachePath:/source/node_modules -w /source node:10.24.1 bash -c "yarn build"

echo "****创建 sasc-cherry-explorer 的 nginx 镜像......"
docker build --no-cache -t sasc-cherry-explorer_nginx18:v1 -f sasc-cherry-explorer_nginx18.Dockerfile .

echo "****启动 sasc-cherry-explorer......"
docker rm -f sasc-cherry-explorer
docker run -d --name sasc-cherry-explorer -p 7651:80 sasc-cherry-explorer_nginx18:v1
