@echo off
cd /d C:\Users\DIANA\Documents\img-creator-obsidian
git pull origin main --rebase
git add .
git diff --cached --quiet && goto :eof
git commit -m "vault sync %date% %time%"
git push origin main
