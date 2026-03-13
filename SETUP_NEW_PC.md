# 새 PC 세팅 가이드 (Windows / PowerShell)

```powershell
cd $HOME
git clone https://github.com/jasonjang444-netizen/cefr-vocab-coach.git
cd cefr-vocab-coach
npm install
```

## 1) 환경변수 준비

```powershell
copy .env.example .env
notepad .env
```

- 기존 PC의 `.env` 값(비밀키 포함)을 새 PC `.env`에 붙여넣기

## 2) Prisma/DB 준비

```powershell
npx prisma generate
npx prisma migrate deploy
```

문제가 나면:

```powershell
npx prisma db push
```

## 3) 실행

```powershell
npm run dev
```

브라우저: `http://localhost:3000`

## 4) 작업 이어하기

```powershell
git pull
# 작업
git add .
git commit -m "작업 내용"
git push
```
