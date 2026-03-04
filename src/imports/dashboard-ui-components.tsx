Create a pixel-perfect React dashboard UI matching the provided design reference.

Tech Stack

React (component based)

TailwindCSS

Recharts for charts

Desktop first (1440px width)

The UI contains 3 pages:

Overview Dashboard

Industrial Consumer List

Tariff Analytics Page

PAGE 1 — OVERVIEW DASHBOARD

Top Navbar
Left: APDCEL Dashboard logo
Right navigation:

Overview (active)

Industrial

Commercial

Stats Cards Row

Display these values:

Active Participants
2798

Total Peak Units
43587.70 kWh

Shifted Peak Units
3278.2 h

Participation Rate
67%

Energy Analytics Section

Create 2x2 grid cards.

Reorder layout as:

Position 1
Types of Consumers (Pie Chart)

Position 2
Peak Analytics: Total vs Shift (Line Chart)

Position 3
Daily Performance (Bar Chart)

Position 4
Empty Placeholder card
Label: "Reserved for Future Analytics"

Pie Chart Data

Types of Consumers

Manufacturing: 36%
Agro: 34%
Food: 20%
Others: 10%

Total active users:
2798

Peak Analytics Line Chart Data

Hours:
00,01,02,03,04,05,06,07,08,09,10,11,12

With Response:
120,150,180,200,260,300,340,380,420,400,380,360,350

Without Response:
100,120,150,170,200,220,250,270,290,310,330,350,360

Daily Performance Bar Chart Data

Days:
Mon Tue Wed Thu Fri Sat Sun

Daily Consumption:
30,50,90,110,100,70,120

Peak Shifted:
20,35,75,90,85,60,100

Energy Leaderboard

Industrial Consumer Leaderboard

Position | Service No | Consumer Name | Total Shifted | Score

1 | AKP010 | M/s Greenfy India | 49.4 MWh | 621.1
2 | EGD053 | SRI SURYA CONS PVT LTD | 32.4 MWh | 602.2
3 | ERI105 | M/s Sri Durga Aqua | 30.7 MWh | 590.7
4 | ERI183 | V V R Agro Industry | 27.6 MWh | 585.3
5 | ERI257 | M/s Anande Fisheries | 24.9 MWh | 573.1

Commercial Consumer Leaderboard

Position | Service No | Consumer Name | Total Shifted | Score

1 | AKP020 | Avanee Refol Private Ltd | 67.2 MWh | 621.1
2 | AKP046 | M/s Arif Exports | 56.4 MWh | 602.2
3 | EGD018 | M/s Commissioner | 49.7 MWh | 590.7
4 | EGD029 | SRI MAGANTI KIRAN | 47.6 MWh | 585.3
5 | ERI044 | Imperial Hospital | 46.9 MWh | 573.1

PAGE 2 — INDUSTRIAL CONSUMER LIST

Header:
Industrial Consumer List

Search bar placeholder:
Search by Service No

Table Columns:

S.No
Service No
Consumer Name
Category
Contracted Demand
HT Income

Table Data:

1 | AKP001 | Smt. Kandregula Durgabai | COMMERCIAL-HT | 100 kVA | 11
2 | AKP002 | Sri Pedireddy Venkata Suryanarayana | COMMERCIAL-HT | 120 kVA | 11
3 | AKP004 | M/s INOX Air Products Pvt Ltd | COMMERCIAL-HT | 150 kVA | 11
4 | AKP009 | M/s Oxygeneca Labs Pvt Ltd | COMMERCIAL-HT | 120 kVA | 11
5 | AKP010 | M/s Greenfy India | INDUSTRY (GENERAL)-HT | 260 kVA | 11
6 | AKP011 | M/s Anjani Ready Mix Concrete | INDUSTRY (GENERAL)-HT | 150 kVA | 11
7 | AKP016 | IRCTC | COMMERCIAL-HT | 320 kVA | 11
8 | AKP018 | Lakshmi Narasimha | INDUSTRY (GENERAL)-HT | 160 kVA | 11
9 | AKP020 | Avanee Refsol Private Ltd | COMMERCIAL-HT | 500 kVA | 11
10 | AKP022 | M/s Sai Suguna Aqua Products | INDUSTRY (GENERAL)-HT | 250 kVA | 11
11 | AKP023 | M/s KEC International Limited | COMMERCIAL-HT | 250 kVA | 11

Pagination:
1 2 3 4 5 ... 28

PAGE 3 — TARIFF ANALYTICS

Top Banner

Normal Tariff Active
(15:00–18:00 & 22:00–24:00)
₹6.3 per unit

Stats Cards

Total Cost Saved
₹35,123

Total Units Saved
540 kWh

Morning Peak Hour Cost / Consumption
₹3,123 / 160 kWh

Evening Peak Hour Cost / Consumption
₹1,312 / 60 kWh

Consumption Chart Data

Hours:
0–23

Baseline Consumption:
35,12,18,28,30,15,22,25,28,26,24,23,22,20,18,19,21,25,28,30,26,20,15,10

Actual Consumption:
30,10,15,22,24,12,20,35,40,32,28,25,22,21,23,26,28,30,38,42,35,22,12,5

Highlight peak ranges:
Morning Peak: 06–09
Evening Peak: 18–21

Shift History Table

Date | Time | Shifted % | Value | Points

2025-06-04 | 08:30 PM | 19% | 128 | 250
2025-06-03 | 06:00 PM | 20% | 145 | 310
2025-06-05 | 08:45 AM | 22% | 148 | 370

Design Style

Soft grey dashboard background

White cards

Rounded corners (12px)

Light shadows

Purple/blue analytics theme

Professional enterprise dashboard UI

Create reusable React components:

Navbar
StatCard
PieChartCard
LineChartCard
BarChartCard
LeaderboardTable
ConsumerTable
TariffChart
ShiftHistoryTable