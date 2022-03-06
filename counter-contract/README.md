# smart contract 개발

## truffle 설치
```aidl
npm install -g truffle
```
### version 확인
```aidl
truffle version
```

## 프로젝트 생성
```aidl
truffle init
```

## 프로젝트 컴파일
```aidl
truffle compile
```

## 스마트 컨트랙 배포
```aidl
truffle migrate --reset

Summary
=======
> Total deployments:   2
> Final cost:          0.00976078 ETH

```
contracts/ 폴더내 있는 모든 컨트랙트를 재배포한다. --reset이 없다면, 이미 배포한 파일들은 재배포하지 않는다.

배포 후 아래와 같이 총 배포된 스마트컨트랙, 총 비용이 표시된다.
