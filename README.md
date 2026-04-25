# KeenKeeper

KeenKeeper is a relationship tracker web app where you can manage friends, log interactions (Call/Text/Video), view timeline history, and monitor friendship analytics.

## Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS
- daisyUI
- Recharts
- Browser Local Storage

## Key Features

1. **Friend Management UI**
	- Friends loaded from JSON data
	- Card-based home view with status, tags, and due context
	- Dedicated friend detail page

2. **Interaction Tracking + Timeline**
	- Quick Check-In buttons (Call, Text, Video)
	- Automatically saves interaction entries with current date
	- Timeline page with filter by interaction type

3. **Analytics Dashboard**
	- Friendship Analytics page with pie chart
	- Visual breakdown of Call/Text/Video interactions

## Pages Included

- Home (`/`)
- Timeline (`/about`)
- Stats (`/stats`)
- Friend Details (`/friends/[id]`)
- Custom 404 page

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Notes

- Timeline entries are stored in browser localStorage.
- Data source for friends is `public/friends.json`.
