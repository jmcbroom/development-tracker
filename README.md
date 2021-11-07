# development-tracker

Detour Detroit is building a development tracker for Detroit, Hamtramck, and Highland Park.

## Developing/Contributing

1. Clone this repository
2. Populate `.env.local.example` and rename to `.env.local`
3. Run `npm install` or `yarn`
4. Run `yarn dev` to start your own version of the site at localhost:3000

## Tech stack

Here's a brief overview of parts of our stack -- where available I've linked to some videos which I think give a good explanation of the library/service/tool.

### React & Next.js

React is a popular front-end JavaScript library that makes it easy to build websites with flexible, reusable components.

[React in 100 seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM) is a good explanation of what React does and its benefits.

Most sites use a React *framework* that handles low-level functions like URL routing - we're choosing [Next.js](https://nextjs.org/) as ours. We can point Next.js at Airtable, and Next.js will generate all of our sites' web pages for us based on the template we tell it to use, using React components.

[Next.js in 100 seconds](https://www.youtube.com/watch?v=Sklc_fQBmcs) is the first part of this longer video. In particular we use Next.js as a static site generator.

React & Next.js are both free to use.

### Airtable

[Airtable](https://airtable.com/) is our human-friendly CMS for the site. The Projects table and the Meetings table in our base control what pages get built, what components appear on those. We use the relational capability of Airtable to create a link between Projects and Meetings.

We should expect to pay for Airtable if we keep using it. The free tier will be good enough for a while, but we should probably plan on Pro. Airtable is paid by the user, as well, so keeping the number of Airtable users at a minimum is key.

[A quick tour of Airtable](https://www.youtube.com/watch?v=r0lsyTaAuJE) is a little sales-pitchy but gives a good overview. I prefer building with Airtable because it's pretty pleasant to use as a database with relational features.

### Supabase

[Supabase](https://supabase.io/) is an open-source clone of Google's [Firebase](https://firebase.google.com/). We use this for two purposes currently:
- Authentication: Supabase manages the entire magic-link process, and gives us options in the site to display different content/components to logged-in users
- File storage: In order to support uploads to Airtable, the file must already exist at a URL. A user uploads the file to our Supabase bucket and then we use that URL to feed to Airtable, who then make their own copy of the file. Therefore we can consider this bucket as strictly temporary.

Theoretically, we could use Supabase's database function to fully replace Airtable. This would require us to greatly expand the in-site editing capabilities. But it would also enable deeper user integrations ("Give Jimmy permission to edit projects within 1.5 miles of [-83.5, 42.5]") since the site data would be living directly next to the user data.

Here's [a comparison of Supabase with Firebase](https://www.youtube.com/watch?v=WiwfiVdfRIc&t=50s). We're using Auth and Storage.

Supabase has a [generous free tier](https://supabase.io/pricing) (500MB database space, 10K users, 1GB storage) but we probably want to pay for a production instance at $25/mo. 

### Netlify

Netlify is a web hosting provider which integrates with our GitHub project repository. When we push new code to the `main` (production) branch, Netlify ingests the changes and builds a new version of the site -- this is known as continuous integration. Netlify can also look at a `development` branch of the codebase and build a development site for testing and feedback purposes.

Other things we get with Netlify:
- Basic analytics (how many visits, etc)
- Domain management
- A/B testing

I have a business plan at Netlify that the dev-tracker can be hosted at -- the limits on that are very high, but shared across all my websites. Right now we don't come too close to the limit but we may approach that if the dev tracker becomes very popular.

### Mapbox

[Mapbox](https://www.mapbox.com/) is a somewhat small part of the site, but it is a potential cost if/when the site becomes very popular. We use their underlying map data and put our own on top of it. It's technically possible to replace them with open-source tools and our own data, but we should stay with Mapbox certainly as long as we're still within the usage limits of their free tier.