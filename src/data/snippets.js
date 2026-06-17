export const LANGUAGES = ["Python","HTML","CSS","JavaScript","React","Java","Git & GitHub","DevOps","AWS"];

export const LANG_COLORS = {
  Python:        { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30",    dot: "#60A5FA" },
  HTML:          { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30",  dot: "#FB923C" },
  CSS:           { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/30",  dot: "#C084FC" },
  JavaScript:    { bg: "bg-yellow-500/10",  text: "text-yellow-400",  border: "border-yellow-500/30",  dot: "#FACC15" },
  React:         { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/30",    dot: "#22D3EE" },
  Java:          { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30",     dot: "#F87171" },
  "Git & GitHub":{ bg: "bg-pink-500/10",    text: "text-pink-400",    border: "border-pink-500/30",    dot: "#F472B6" },
  DevOps:        { bg: "bg-green-500/10",   text: "text-green-400",   border: "border-green-500/30",   dot: "#4ADE80" },
  AWS:           { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   dot: "#FBBF24" },
};

export const SEED_SNIPPETS = [
  // Python
  { lang:"Python", title:"List Comprehension", desc:"Create a new list in one clean line", code:"squares = [x**2 for x in range(10)]\neven   = [x for x in nums if x % 2 == 0]\npairs  = [(x,y) for x in [1,2] for y in [3,4]]", output:"[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]" },
  { lang:"Python", title:"Dictionary Operations", desc:"Create, access, update and loop dicts", code:"d = {'name': 'Alice', 'age': 25}\nd['city'] = 'Hyd'          # add key\ndel d['age']              # remove key\nfor k, v in d.items():\n    print(f'{k}: {v}')", output:"name: Alice\ncity: Hyd" },
  { lang:"Python", title:"Lambda & Map", desc:"One-line functions and functional tools", code:"double = lambda x: x * 2\nnums   = [1, 2, 3, 4, 5]\nresult = list(map(double, nums))\nfilt   = list(filter(lambda x: x>2, nums))", output:"[2, 4, 6, 8, 10]\n[3, 4, 5]" },
  { lang:"Python", title:"Try / Except", desc:"Handle errors gracefully", code:"try:\n    x = int(input('Enter number: '))\n    print(10 / x)\nexcept ValueError:\n    print('Not a number!')\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nfinally:\n    print('Done')", output:"Cannot divide by zero!\nDone" },

  // HTML
  { lang:"HTML", title:"Semantic Tags", desc:"Replace divs with meaningful HTML5 elements", code:"<header>\n  <nav>\n    <a href='/'>Home</a>\n  </nav>\n</header>\n<main>\n  <section>\n    <article>\n      <h1>Title</h1>\n      <p>Content here</p>\n    </article>\n  </section>\n</main>\n<footer>© 2026</footer>", output:"Renders a semantic page structure" },
  { lang:"HTML", title:"Form Elements", desc:"All important form inputs in one place", code:"<form action='/submit' method='POST'>\n  <input type='text'     placeholder='Name' />\n  <input type='email'    placeholder='Email' />\n  <input type='password' placeholder='Pass' />\n  <select>\n    <option>Option 1</option>\n  </select>\n  <textarea rows='4'></textarea>\n  <button type='submit'>Send</button>\n</form>", output:"A complete HTML form" },
  { lang:"HTML", title:"Meta Tags (SEO)", desc:"Essential head tags for every webpage", code:"<head>\n  <meta charset='UTF-8' />\n  <meta name='viewport'\n        content='width=device-width,\n        initial-scale=1.0' />\n  <meta name='description' content='Page desc' />\n  <meta property='og:title' content='Title' />\n  <title>Page Title</title>\n  <link rel='stylesheet' href='style.css' />\n</head>", output:"Sets up SEO and responsive viewport" },

  // CSS
  { lang:"CSS", title:"Flexbox Centering", desc:"Center anything horizontally and vertically", code:".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}", output:"Items centered perfectly in container" },
  { lang:"CSS", title:"CSS Grid Layout", desc:"Responsive grid that auto-fits columns", code:".grid {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n  padding: 1rem;\n}", output:"Responsive auto-fitting grid layout" },
  { lang:"CSS", title:"CSS Variables", desc:"Define and reuse colors/sizes globally", code:":root {\n  --color-primary: #0ea5e9;\n  --color-bg:      #0f172a;\n  --radius:        8px;\n  --font-size:     16px;\n}\n\n.btn {\n  background:    var(--color-primary);\n  border-radius: var(--radius);\n}", output:"Reusable design tokens" },

  // JavaScript
  { lang:"JavaScript", title:"Array Methods", desc:"map, filter, reduce — the essential trio", code:"const nums = [1,2,3,4,5];\n\nconst doubled  = nums.map(x => x * 2);\nconst evens    = nums.filter(x => x % 2 === 0);\nconst total    = nums.reduce((a,x) => a + x, 0);\nconst found    = nums.find(x => x > 3);\nconst allBig   = nums.every(x => x > 0);", output:"[2,4,6,8,10]\n[2,4]\n15\n4\ntrue" },
  { lang:"JavaScript", title:"Async / Await", desc:"Handle promises without messy .then() chains", code:"async function getUser(id) {\n  try {\n    const res  = await fetch(`/api/users/${id}`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Failed:', err);\n  }\n}\n\ngetUser(1).then(u => console.log(u));", output:"{ id: 1, name: 'Alice', ... }" },
  { lang:"JavaScript", title:"Destructuring", desc:"Extract values from arrays and objects cleanly", code:"// Object destructuring\nconst { name, age, city = 'Hyd' } = user;\n\n// Array destructuring\nconst [first, second, ...rest] = [1,2,3,4,5];\n\n// In function params\nfunction greet({ name, age }) {\n  return `Hi ${name}, age ${age}`;\n}", output:"Hi Alice, age 25" },

  // React
  { lang:"React", title:"useState Hook", desc:"Add local state to a functional component", code:"import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c+1)}>\n        Increment\n      </button>\n    </div>\n  );\n}", output:"Renders interactive counter component" },
  { lang:"React", title:"useEffect Hook", desc:"Run side effects after render or on dep change", code:"import { useEffect, useState } from 'react';\n\nfunction UserList() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    fetch('/api/users')\n      .then(r => r.json())\n      .then(setUsers);\n\n    return () => console.log('cleanup');\n  }, []); // [] = run once on mount\n}", output:"Fetches users on component mount" },
  { lang:"React", title:"Props & PropTypes", desc:"Pass and validate data between components", code:"function Card({ title, desc, color = 'blue' }) {\n  return (\n    <div className={`card card-${color}`}>\n      <h2>{title}</h2>\n      <p>{desc}</p>\n    </div>\n  );\n}\n\n// Usage\n<Card\n  title='Hello'\n  desc='World'\n  color='green'\n/>", output:"Renders styled card with passed data" },

  // Java
  { lang:"Java", title:"ArrayList Basics", desc:"Dynamic array — add, remove, loop", code:"import java.util.ArrayList;\n\nArrayList<String> list = new ArrayList<>();\nlist.add(\"Apple\");\nlist.add(\"Banana\");\nlist.remove(0);\n\nfor (String item : list) {\n    System.out.println(item);\n}\nSystem.out.println(\"Size: \" + list.size());", output:"Banana\nSize: 1" },
  { lang:"Java", title:"HashMap", desc:"Key-value store — the Java dictionary", code:"import java.util.HashMap;\n\nHashMap<String, Integer> scores = new HashMap<>();\nscores.put(\"Alice\", 95);\nscores.put(\"Bob\",   87);\n\nSystem.out.println(scores.get(\"Alice\"));\n\nfor (var entry : scores.entrySet()) {\n    System.out.println(\n      entry.getKey() + \" → \" + entry.getValue());\n}", output:"95\nAlice → 95\nBob → 87" },
  { lang:"Java", title:"OOP — Class & Object", desc:"Define a class with constructor and methods", code:"public class Student {\n  String name;\n  int    age;\n\n  Student(String name, int age) {\n    this.name = name;\n    this.age  = age;\n  }\n\n  void greet() {\n    System.out.println(\n      \"Hi, I'm \" + name);\n  }\n}\n\nStudent s = new Student(\"Ravi\", 20);\ns.greet();", output:"Hi, I'm Ravi" },

  // Git & GitHub
  { lang:"Git & GitHub", title:"Git Daily Commands", desc:"The git commands you use every single day", code:"git init                    # new repo\ngit clone <url>             # copy repo\ngit status                  # what changed?\ngit add .                   # stage all\ngit commit -m 'feat: msg'   # save snapshot\ngit push origin main        # upload\ngit pull                    # download latest\ngit log --oneline           # history", output:"Tracks and syncs your code changes" },
  { lang:"Git & GitHub", title:"Git Branching", desc:"Create, switch, merge and delete branches", code:"git branch feature-login    # create branch\ngit checkout feature-login  # switch to it\n# or in one command:\ngit checkout -b feature-login\n\ngit merge feature-login     # merge to main\ngit branch -d feature-login # delete branch\ngit branch -a               # list all", output:"Isolated feature development flow" },
  { lang:"Git & GitHub", title:"Connect to GitHub", desc:"Push a local project to a new GitHub repo", code:"git remote add origin <repo-url>\ngit branch -M main\ngit push -u origin main\n\n# check which remote is linked\ngit remote -v", output:"Local repo linked & pushed to GitHub" },
  { lang:"Git & GitHub", title:"Undo Changes", desc:"Fix mistakes before or after committing", code:"git checkout -- file.txt     # discard unstaged edit\ngit reset HEAD file.txt      # unstage a file\ngit revert <commit-hash>     # undo a commit safely\ngit reset --hard HEAD~1      # delete last commit (careful!)", output:"Reverts changes without losing history" },
  { lang:"Git & GitHub", title:".gitignore Basics", desc:"Keep unwanted files out of your repo", code:"node_modules\ndist\n.env\n*.log\n.DS_Store", output:"These files/folders are never tracked by git" },

  // DevOps
  { lang:"DevOps", title:"Docker Basics", desc:"Containerize and run your app anywhere", code:"# Build image from Dockerfile\ndocker build -t myapp:v1 .\n\n# Run container\ndocker run -p 3000:3000 myapp:v1\n\n# List running containers\ndocker ps\n\n# Stop container\ndocker stop <container_id>\n\n# docker-compose\ndocker-compose up --build", output:"App runs in isolated container" },

  // AWS
  { lang:"AWS", title:"S3 File Commands", desc:"Upload, list, and manage files in S3 buckets", code:"# List all buckets\naws s3 ls\n\n# List files in a bucket\naws s3 ls s3://my-bucket/\n\n# Upload a file\naws s3 cp file.txt s3://my-bucket/\n\n# Download a file\naws s3 cp s3://my-bucket/file.txt .\n\n# Sync entire folder\naws s3 sync ./dist s3://my-bucket/", output:"Files uploaded/downloaded from S3" },
  { lang:"AWS", title:"EC2 Basics", desc:"Launch and connect to a virtual server", code:"# List running instances\naws ec2 describe-instances\n\n# Start an instance\naws ec2 start-instances \\\n  --instance-ids i-1234567890\n\n# Stop an instance\naws ec2 stop-instances \\\n  --instance-ids i-1234567890\n\n# SSH into instance\nssh -i key.pem ec2-user@<public-ip>", output:"Controls your cloud server" },
  { lang:"AWS", title:"Lambda Function", desc:"Deploy a serverless function to AWS", code:"# Deploy with zip\nzip function.zip index.js\n\naws lambda create-function \\\n  --function-name myFunc \\\n  --runtime nodejs18.x \\\n  --zip-file fileb://function.zip \\\n  --handler index.handler \\\n  --role arn:aws:iam::ACCOUNT:role/role\n\n# Invoke it\naws lambda invoke \\\n  --function-name myFunc out.json", output:"Serverless function deployed & invoked" },
];
