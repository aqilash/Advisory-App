# Advisory-App

## Application Setup
1. Install package dependencies using:
```
npm install
```
2. To start application run:
```
npm run dev
```

## How to run prisma migrations
1. Generate the prisma client by running the following command in the terminal. The prisma client is used to run queries on your db:
```
npx prisma generate
```
2. Now we will migrate our db which will create a sql file of our current schemas and sync our postgres db with any prisma schemas we have:
 ```
npx prisma migrate dev
```
3. To view your database via browser:
 ```
npx prisma studio
```

## How to seed database
To seed the database, run the db seed CLI command:
```
npx prisma db seed
```

## How to edit a migration file
1. Make a schema change that requires custom SQL (for example, to preserve existing data)
2. Create a draft migration using:
```
npx prisma migrate dev --name migration-name --create-only
```
3. Modify the generated SQL file.
4. Apply the modified SQL by running:
```
npx prisma migrate dev
```
