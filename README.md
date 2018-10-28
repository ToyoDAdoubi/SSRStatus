# SSRStatus

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

* SSRStatus是一个可以在线监控Shadowsocks/ShadowsocksR账号的云探针、云监控探针~，该云监控的网页文件基于ServerStatus（ https://github.com/ToyoDAdoubi/ServerStatus-Toyo/ ）项目。
* 在线演示：https://sstz.toyoo.ml/
* 我的博客：https://doub.io/shell-jc5/

# 更新说明：

* 20170520: 修改网页文件窄屏/移动设备的显示效果，修改JS刷新时间
* 20170519: 发布正式版本

# 安装教程：     

执行下面的代码下载并运行脚本。
```Bash
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrstatus.sh && chmod +x ssrstatus.sh && bash ssrstatus.sh

# 如果上面这个脚本无法下载，尝试使用备用下载：
wget -N --no-check-certificate https://softs.loan/Bash/ssrstatus.sh && chmod +x ssrstatus.sh && bash ssrstatus.sh
```
下载并运行脚本后会出现脚本操作菜单，选择并输入` 1 `就会开始安装。

一开始会提示你输入 网站服务器的域名和端口，如果没有域名可以直接回车代表使用` 本机IP:8888 `。

## 简单步骤：

首先安装服务端，安装过程中会提示：

``` bash
是否由脚本自动配置HTTP服务(服务端的在线监控网站)[Y/n]

# 如果你不懂，那就直接回车，如果你想用其他的HTTP服务自己配置，那么请输入 n 并回车。
# 注意，当你曾经安装过 服务端，同时没有卸载Caddy(HTTP服务)，那么重新安装服务端的时候，请输入 n 并回车。
```

然后会提示你输入网站服务器的域名和端口，如果没有域名可以直接回车代表使用` 本机IP:8888 `。

然后部署完 HTTP服务，就会让你设置 检测间隔时间。

``` bash
请选择你要设置的ShadowsocksR账号检测时间间隔（如账号很多，请不要设置时间间隔过小）
1. 5分钟
2. 10分钟
3. 20分钟
4. 30分钟
5. 40分钟
6. 50分钟
7. 1小时
8. 2小时
9. 自定义输入

(默认: 2. 10分钟):
```
我们还需要设置一下ShadowsocksR子目录变量，打开脚本文件

``` bash
vi ssrstatus.sh
# 按 I键 进入编辑模式，然后修改后按 ESC键 退出编辑模式，并输入 :wq 保存并退出
```
然后我们找到 第16行 的 `SSR_folder="/root/shadowsocksr/shadowsocks"` 参数，修改引号内的ShadowsocksR目录名，必须设置为 ShadowsocksR子目录的绝对路径，并且最后一位不能加上 `"/"`。

注意：如果你用的是我的ShadowsocksR一键脚本，那么位置即是：`/usr/local/shadowsocksr/shadowsocks`

最后 添加账号配置即可。

# 使用说明：

进入下载脚本的目录并运行脚本：

``` bash
# 管理菜单
./ssrstatus.sh

# 检测所有账号配置（快捷参数）
./ssrstatus.sh t

# 检测单独账号配置（快捷参数）
./ssrstatus.sh o

# 检测自定义账号配置（快捷参数）
./ssrstatus.sh a

# 查看日志输出（快捷参数）
./ssrstatus.sh log
```

然后选择你要执行的选项即可。

``` bash
SSRStatus 一键安装管理脚本 [vx.x.x]
-- Toyo | doub.io/shell-jc4 --

0. 升级脚本
————————————
1. 安装 依赖及Web网页
2. 卸载 依赖及Web网页
————————————
3. 测试 所有账号
4. 测试 单独账号
5. 测试 自定义账号
————————————
6. 设置 配置信息
7. 查看 配置信息
8. 查看 运行日志
9. 设置 定时间隔
————————————

当前状态: Web网页 已安装

请输入数字 [0-9]:
```
## 其他操作

### Caddy（HTTP服务）：

* 启动：service caddy start
* 停止：service caddy stop
* 重启：service caddy restart
* 查看状态：service caddy status
* Caddy配置文件：/usr/local/caddy/Caddyfile

默认脚本只能一开始安装的时候设置配置文件，更多的Caddy使用方法，可以参考这些教程：https://doub.io/search/caddy

——————————————————————————————————————

* 网页文件：/usr/local/SSRStatus
* 配置文件：ssr_status.conf（和脚本在同一个目录中）
* 查看日志：cat ssr_status.log（和脚本在同一个目录中）

# 其他说明

## 修改网页标题或公告

如果要修改网页标题或者网页顶部公告内容，打开 `/usr/local/SSRStatus/web/index.html` 文件修改即可，很显眼。

## 批量添加账号配置

如果要批量添加账号配置，那么用脚本反而速度慢，可以按一下格式写入配置文件：

``` bash
ss/ssr链接###名称###位置###禁用状态

# 示例：
ssr://xxxxxxxx###DOUBI###Japen###fales

# fales代表禁用状态否，即启用，true 反之。
```

然后可以这样快速写入配置文件：

``` bash
echo -e "ssr://xxxxxxxx###DOUBI1###Japen###fales
ssr://yyyyyyyy###DOUBI2###Hong Kong###true
ssr://zzzzzzzz###DOUBI3###洛杉矶(支持中文，只要你系统支持显示和输入)###fales" >> ssr_status.conf
```

# 相关开源项目： 

* ServerStatus：https://github.com/ToyoDAdoubi/ServerStatus-Toyo/
* ssr_check.sh: https://github.com/ToyoDAdoubi/doubi
