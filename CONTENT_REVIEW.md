# การทบทวนเนื้อหาวิชาการ · รุ่นพี่เลี้ยง

ตรวจข้อมูล 1 ตุลาคม 2026 จากเคสต้นฉบับและแหล่งอ้างอิงที่แสดงใน `dist/story.js` และ `dist/mentor.js` เกมคงข้อมูลผู้ป่วยต้นทางไว้ ส่วนบทเภสัชกรน้องใหม่ พี่อัน อารมณ์ และคำถามต่อยอดเป็นงานดัดแปลงใหม่

## ประเด็นจากต้นฉบับที่นำมาใช้

| ประเด็น | จุดที่ใช้ในเกม | แนวทางสอน |
|---|---|---|
| Alzheimer’s กับการค้างอาหาร/เริ่มกลืน | `oral-phase` | พิจารณาการรับรู้ motor planning และ coordination พร้อมประเมินสาเหตุร่วม |
| ความเสี่ยงเมื่อให้ยาทางปากทันที | `swallow`, `liquid` | ตรวจแผนการกลืนก่อนเลือก formulation; thin liquids อาจไม่ปลอดภัย |
| CRP ลดลงกับการติดตามการรักษา | `antibiotics`, `pk-antibiotic-duration` | ใช้อาการและความคงที่ร่วมกับผลตรวจ ไม่ใช้ CRP ตัวเดียว |
| ระยะยาปฏิชีวนะ | `pk-antibiotic-duration` | ประมาณ 5 วันใน AP ที่ตอบสนองดี; ถ้าไม่ดีขึ้นหรือมีภาวะแทรกซ้อนให้ทบทวน |
| Weak-base ionization | `pk-ionization` | แก้ทิศทางตาม BH⁺/B = 10^(pKa−pH); แยก ionization, dissolution และ permeation |
| Sertraline/levothyroxine กับวิธีให้ยาที่บ้าน | `disclosure`, `thyroid`, `sertraline` | รับฟังผู้ดูแลก่อน ตรวจผลิตภัณฑ์และเวลาให้ยา |
| แผนจำหน่ายร่วมกับทีม | `handoff`, `final` | ยืนยันการกลืน วิธีให้ยาและผู้ติดตามก่อนส่งต่อ |
| Sertraline บดกับโยเกิร์ต | `sertraline`, `pk-sertraline` | ไม่สรุปว่าโยเกิร์ตทำให้ยาล้มเหลวจากข้อเท็จจริงเคสนี้เพียงอย่างเดียว |
| Levothyroxine ขณะท้องว่าง | `thyroid`, `pk-levothyroxine` | ตรวจฉลาก/แผนการกลืน; เสริมการเว้น calcium/iron เมื่อมีการใช้จริง |
| ตัวพาสำหรับ sertraline | `pk-sertraline` | แยกยาเม็ดกับ oral concentrate; ห้ามเหมารวมว่าทุกชนิดต้องน้ำส้ม |
| MMSE 22 → 26 ในการติดตาม | `pk-cognition` | เป็นข้อมูลติดตาม ไม่ใช่การเปลี่ยนทันที; ไม่พิสูจน์ Alzheimer’s หายหรือกลไกโยเกิร์ต |
| ไม่มีไอก็ยังสำลักได้ | `silent` | อธิบาย silent aspiration และการประเมินรายบุคคล |
| ท่าขณะกิน/หลังกิน | `posture` | คงแนวคิดอยู่ท่าตั้งตรงอย่างน้อย 30 นาทีในเคสนี้เมื่อเหมาะสม; ไม่เป็นกฎเดียวสำหรับทุกคน |
| สุขภาพช่องปาก | `oralCare` | เลือกวิธีทำความสะอาดที่ปลอดภัย ลดแหล่งเชื้อร่วมกับทีม |
| PPI ระยะยาว | `pk-ppi` | สถานการณ์สมมติ; ทบทวน indication, H⁺/K⁺-ATPase, gastric pH และข้อจำกัดของ observational evidence |
| Chlorhexidine กับความเสี่ยงสำลัก | `pk-chlorhexidine` | ไม่สรุปประโยชน์ป้องกัน AP ทุกราย; แยก large ingestion ของ 5% CHG ใน case report จาก routine mouthwash |
| ไทรอยด์ต่ำกับ cognition | `pk-cognition`, `pk-thyroid-followup` | ประเมิน reversible contributors และติดตามอย่างเหมาะสม; ไม่ปรับขนาดเองจากคะแนนสมอง |
| Antipsychotics | `pk-antipsychotic` | สถานการณ์สมมติ; sedation/EPS/dysphagia และการประเมิน benefit–risk |
| Enalapril/ACE inhibitor | `pk-ace-inhibitor` | สอน substance P/bradykinin พร้อม population limits; ไม่เปลี่ยน losartan อัตโนมัติในเคสที่ไม่ได้ระบุ stroke |

## คำถามเชิงลึกเพิ่มเติม

คำถามหลังเคส 12 ข้อมีคำตอบถูกเพียงหนึ่งตัวทุกข้อ และทุกตัวเลือกมีเหตุผล เฉลยเปิดหลังตอบหรือหมดเวลาโดยไม่มีเวลานับถอยหลังระหว่างอ่าน สองหัวข้อที่ขยายจากต้นฉบับโดยตรงคือกลไก ampicillin–sulbactam และการติดตาม TSH 6–8 สัปดาห์หลังปรับขนาดในผู้ใหญ่ primary hypothyroidism

ตัวอย่าง weak base ใช้ **pKa สมมติ = 8** เพื่อฝึกสมการ ไม่ได้อ้างว่าเป็น pKa จริงของ sertraline งาน formulation ที่อ้างอิงไม่ใช่การศึกษาที่พิสูจน์ว่าโยเกิร์ตทำให้ sertraline ล้มเหลวทางคลินิก

เมื่อเข้าสู่ฉาก `mentor-return` ผลความปลอดภัยและความสัมพันธ์ในเคสถูกเก็บไว้ คะแนนข้อสอบและความไว้วางใจพี่เลี้ยงไม่เปลี่ยนผลนั้น สรุปหลังเกมแยกความรู้เป็น 5 หัวข้อและชวนทบทวนเรื่องที่ยังตอบไม่ถูก

## แหล่งข้อมูลสำคัญ

- [เคสต้นฉบับ · KMU research team](https://pharmahht.github.io/Dysphagia2601/)
- [NHS SPS · ตรวจการบดเม็ด/เปิดแคปซูล](https://sps.nhs.uk/articles/checking-if-tablets-can-be-crushed-or-capsules-opened/)
- [NHS SPS · ตัวพาและอาหาร/ของเหลวสำหรับให้ยา](https://sps.nhs.uk/articles/why-and-how-medicines-are-given-with-soft-food-or-thickened-fluid/)
- [DailyMed · Sertraline tablets / oral solution](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ccb264a4-5d50-4317-a67e-ba6daa2b8297)
- [DailyMed · Levothyroxine monitoring](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=741a8b30-86e1-4f37-917a-73265a82ee07)
- [DailyMed · Ampicillin–sulbactam](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=006f9a3f-b4e3-4aa5-ac65-6cc3d3e2582d)
- [BTS · Aspiration pneumonia 2023](https://www.brit-thoracic.org.uk/clinical-resources/clinical-statements/aspiration-pneumonia/)
- [Sertraline formulation study · AAPS PharmSciTech 2022](https://link.springer.com/article/10.1208/s12249-022-02339-0)
- [DailyMed · Omeprazole](https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8090d4c3-3184-7812-53d7-aa30e14b79d1)
- [Herzig et al. · Acid suppression and pneumonia 2009](https://pubmed.ncbi.nlm.nih.gov/19470989/)
- [Hirata & Kurokawa · CHG aspiration case report 2002](https://pubmed.ncbi.nlm.nih.gov/11931511/)
- [Hollaar et al. · Chlorhexidine oral rinse study 2017](https://pubmed.ncbi.nlm.nih.gov/28629318/)
- [Herzig et al. · Antipsychotics and aspiration pneumonia 2017](https://pubmed.ncbi.nlm.nih.gov/29095482/)
- [ACE inhibitors · Updated systematic review 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9249936/)
- [Caldeira et al. · ACE inhibitors / ARBs 2012](https://www.bmj.com/content/345/bmj.e4260)
- [NICE NG97 · Dementia assessment](https://www.nice.org.uk/guidance/ng97/chapter/Recommendations)

## ขอบเขต

การแปลและเนื้อหาผ่านการตรวจระดับต้นแบบแล้ว ยังไม่ใช่ข้อสอบที่ผ่านการรับรองความเที่ยงตรงหรือการทบทวนโดยคณะผู้เชี่ยวชาญ คะแนนเป็นกลไกการเรียนรู้ ผู้สอนควรทบทวนผลิตภัณฑ์และแนวทางท้องถิ่นก่อนนำไปใช้ประเมินอย่างเป็นทางการ ไม่มีไฟล์บันทึกการเล่นที่ผู้ใช้ส่งมาอยู่ในเกมหรือชุดดาวน์โหลด
