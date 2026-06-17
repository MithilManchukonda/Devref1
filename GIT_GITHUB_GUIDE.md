# Git & GitHub Commands for DevRef

Run these from inside your project folder (`D:\devref` or wherever you saved it), in order.

## 1. One-time Git setup (skip if already done before)
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 2. Initialize Git in your project
```bash
git init
```

## 3. Create a .gitignore (important — keeps node_modules out of GitHub)
A `.gitignore` file is already included in this project. Confirm it contains:
```
node_modules
dist
.env
```

## 4. Stage and commit your code
```bash
git add .
git commit -m "Initial commit: DevRef cheat sheet app"
```

## 5. Create a new repository on GitHub
1. Go to **github.com** → click **New repository**
2. Name it `devref` (or `devref-cheat-sheet`)
3. Keep it **Public** (so recruiters can see it)
4. **Do NOT** check "Add a README" (you already have one)
5. Click **Create repository**

## 6. Connect your local project to GitHub
GitHub will show you commands like this after creating the repo — copy YOUR exact version:
```bash
git remote add origin https://github.com/YOUR-USERNAME/devref.git
git branch -M main
git push -u origin main
```

## 7. For future changes (after today)
Every time you make changes and want to update GitHub:
```bash
git add .
git commit -m "Describe what you changed"
git push
```

## Common issues

**"fatal: not a git repository"** → you're not inside the project folder. Run `cd D:\devref` first.

**Asks for username/password and fails** → GitHub no longer accepts passwords for git push. You need a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. Give it `repo` permissions
3. Use this token AS your password when prompted

**"remote origin already exists"** → run `git remote remove origin` then redo step 6.

## Verify it worked
Go to `https://github.com/YOUR-USERNAME/devref` in your browser — you should see all your files there.
