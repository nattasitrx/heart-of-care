# เริ่มใช้ชุดโค้ด Heart of Care บน GitHub

ชุดนี้ตรงกับเกม Sites เวอร์ชัน 10: ภาพและชุดแบบเดิม, ดนตรีและเอฟเฟกต์, สามภาษา, ปรับขนาดตัวอักษร, กรอกชื่อ–รหัสนักศึกษา, ประวัติและหลังบ้าน ไม่มีระบบปรับสีผม/ผิว/ใบหน้าที่ถูกถอดออก และไม่มีเสียงพูด

## 1. อัปโหลดครั้งแรกผ่านเว็บ
1. แตก ZIP นี้ก่อน จะได้โฟลเดอร์ Heart-of-Care-GitHub
2. สมัคร/ลงชื่อเข้าใช้ https://github.com
3. กด + > New repository ตั้งชื่อ heart-of-care เลือก Private ก่อน แล้ว Create repository
4. ถ้าเป็น repo ว่าง ใช้ uploading an existing file; ถ้ามีไฟล์แล้วใช้ Add file > Upload files
5. ลากไฟล์และโฟลเดอร์ข้างใน Heart-of-Care-GitHub ขึ้นไป ไม่ลาก ZIP และไม่ลากโฟลเดอร์ครอบซ้อนอีกชั้น
6. ตรวจว่า README.md, package.json, dist/, worker/, drizzle/, scripts/ อยู่ที่ราก repo
7. ใส่ข้อความ Upload initial game source แล้ว Commit changes

GitHub รับไฟล์ผ่านเว็บได้ไม่เกิน 25 MiB ต่อไฟล์ ชุดนี้แต่ละไฟล์ต่ำกว่าขีดจำกัด หากไฟล์/โฟลเดอร์ที่ขึ้นต้นด้วยจุดไม่ถูกอัปโหลด ให้ใช้ GitHub Desktop ตามข้อ 2 แทน โดยเฉพาะ .github/workflows/checks.yml สำหรับระบบทดสอบ

## 2. วิธีที่เหมาะกับการแก้ไขหลายครั้ง: GitHub Desktop
1. ดาวน์โหลด GitHub Desktop จาก https://desktop.github.com และลงชื่อเข้าใช้
2. File > Clone repository เลือก repo ที่สร้างไว้ แล้วเลือกที่เก็บบนคอมพิวเตอร์
3. คัดลอกเนื้อหาในโฟลเดอร์ที่แตก ZIP ไปลงโฟลเดอร์ repo ที่ clone รวม .gitignore, .github และ .openai (เปิดแสดงไฟล์ซ่อนหากจำเป็น)
4. ใน Desktop ดูรายการ Changes ใส่ Summary เช่น Initial game source แล้ว Commit to main
5. กด Push origin เพื่อส่งขึ้น GitHub

Commit = บันทึกชุดการแก้ไขบนเครื่อง; Push = ส่งขึ้น GitHub; Pull = รับการแก้ไขจาก GitHub; Merge = รวมการแก้ไขเข้าฉบับหลัก; Deploy = นำโค้ดขึ้นเกมจริง

## 3. ให้คนอื่นช่วยพัฒนา
### Repo ส่วนตัว
Settings > Collaborators > Add people แล้วเชิญด้วยชื่อบัญชี GitHub หลังตอบรับเขาจะอ่านและเขียนโค้ดได้ ขอให้ทำใน branch ใหม่แล้วส่ง Pull Request (PR) แทนการเขียนทับ main โดยตรง การขอแบบนี้เป็นข้อตกลงร่วมงาน ไม่ใช่การบังคับสิทธิ์ หากต้องบังคับให้ตรวจ PR ก่อน merge ต้องตั้ง branch protection/ruleset และตรวจว่ารองรับในแผนบัญชีที่ใช้

### Repo สาธารณะ
คนอื่น Fork (สำเนา repo ไปบัญชีของตัวเอง) แล้วแก้และส่ง PR กลับมาได้ การแก้ fork ไม่เปลี่ยนเกมของออมอัตโนมัติ หากเขาต้องการเกมของตัวเองต้องตั้งระบบโฮสต์ ฐานข้อมูล และ secret ของตนเอง

## 4. จาก PR ไปสู่เกมที่นักศึกษาเล่น
ขั้นตอนแนะนำ: ผู้พัฒนาสร้าง branch > แก้ > ส่ง PR > ตรวจผลทดสอบใน Checks > ออม/ผู้ตรวจทบทวนเนื้อหาสามภาษาและลองเล่น > Merge > เผยแพร่ผ่าน Sites

ชุดนี้มี GitHub Actions ตรวจ build และทดสอบกติกา ประวัติ สิทธิ์หลังบ้าน และผู้เล่นทั่วไป หลัง push/PR แต่ไม่มีระบบ auto-deploy และไม่มี credential ของเว็บเดิม

เกมปัจจุบัน: https://heart-of-care.nattasitrx.chatgpt.site
การ merge ใน GitHub ยังไม่แก้เว็บที่ลิงก์นี้ ต้องนำโค้ดที่ตรวจแล้วเข้ามาในโครงการ Sites เดิมและเผยแพร่ เจ้าของสามารถส่งลิงก์ repo และ PR/commit ที่ต้องการให้ผู้ช่วยหรือผู้พัฒนาซึ่งมีสิทธิ์ Sites นำขึ้นเว็บได้

หากต้องการอัปเดตอัตโนมัติในภายหลัง ต้องเลือกการเชื่อม GitHub กับแพลตฟอร์มโฮสต์ที่รองรับระบบ backend นี้ก่อน แล้วตั้งค่าการ deploy/สิทธิ์/secret ผ่านช่องทางของผู้ให้บริการ ชุดนี้ยังไม่ได้สร้างการเชื่อมดังกล่าว

GitHub Pages โฮสต์ HTML/CSS/JS แบบ static; เกมเวอร์ชันนี้ใช้ API และ D1 สำหรับผู้เล่นและหลังบ้าน จึงนำทั้งระบบไปไว้ GitHub Pages อย่างเดียวไม่ได้ การเล่นแบบไฟล์ทำได้ แต่ประวัติถาวร/หลังบ้านใช้ไม่ได้ในโหมดนั้น

## 5. จุดแก้โค้ด
- dist/story.js: บทเคสและข้อความสามภาษา
- dist/mentor.js: บทพี่เลี้ยงและคำถามเชิงลึก
- dist/styles.css: สี ขนาด รูปแบบหน้าเกม
- dist/app.js: การกดปุ่ม การแสดงหน้า และการเริ่มเกม
- dist/engine.js: คะแนน เวลา การเปลี่ยนฉากและตอนจบ
- dist/audio.js: ดนตรีและเอฟเฟกต์
- dist/assets/: ภาพอนิเมะและชุด
- worker/: API, ประวัติ และการตรวจสิทธิ์
- db/schema.ts และ drizzle/: โครงสร้างฐานข้อมูลและ migration

อย่าแก้ dist/server/index.js โดยตรง เพราะเป็นผลลัพธ์จาก build

## 6. ลองบนคอมพิวเตอร์
เปิด dist/index.html ได้ทันที กรอกชื่อและรหัสเพื่อเล่นแบบไฟล์ ส่งออกบันทึกรอบที่เปิดอยู่ได้ แต่ไม่เก็บประวัติข้ามครั้งและเปิดหลังบ้านไม่ได้

สำหรับนักพัฒนาใช้ Node.js 22.13 ขึ้นไป (ระบบทดสอบใช้ node:sqlite) แล้วรัน:
```
npm ci
npm run build
npm test
node verify-history.mjs
node verify-admin.mjs
node verify-participant.mjs
```
แพ็กเกจ npm อยู่ใน registry จึงต้องเชื่อมอินเทอร์เน็ตตอน npm ci

## 7. ข้อมูลที่ไม่ได้ส่งออก
ไม่มีฐานข้อมูลนักศึกษา, ไฟล์ CSV ที่ออมอัปโหลด, session/cookie จริง, รหัสผ่านหลังบ้าน, verifier ของรหัสผ่านจริง, API key, หรือ Git credential
ค่ารหัสผ่านตัวอย่างในไฟล์ทดสอบเป็นข้อมูลสมมติเท่านั้น
.openai/hosting.json มีเพียง binding DB ไม่มี project_id ของเว็บจริง เพื่อไม่ผูก repo สำเนาเข้ากับเว็บของออมโดยอัตโนมัติ
ระบบที่นำไปโฮสต์ใหม่ต้องตั้ง DB, ADMIN_PASSWORD_HASH และ PARTICIPANT_SECRET เองตาม README และต้องไม่เชื่อถือ header บัญชีที่ client ตั้งเอง
อย่าลบ/สร้างฐานข้อมูลใหม่เพื่ออัปเดตเฉพาะบทหรือหน้าตา ถ้าเปลี่ยน schema ให้ทำ migration พร้อมสำรองข้อมูลก่อน

## 8. การนำไปทำต่อ
คง LICENSE.txt และเครดิตต้นฉบับไว้ การดัดแปลงนี้ระบุ CC BY-NC-SA 4.0: ให้เครดิต ระบุการแก้ไข ใช้โดยไม่แสวงหากำไร และเผยแพร่งานดัดแปลงภายใต้เงื่อนไขเดียวกัน ตรวจเนื้อหาทางเภสัชกรรมโดยผู้เชี่ยวชาญก่อนใช้ประเมินจริง

## เอกสารทางการ
- สร้าง repo: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- อัปโหลดไฟล์: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- เชิญผู้ร่วมงาน: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository
- Pull Request: https://docs.github.com/en/pull-requests/reference/pull-requests
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
