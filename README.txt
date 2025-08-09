<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>🧠 Ronen Lesnick – Data Portfolio</title>
  <meta name="description" content="Ronen Lesnick's data portfolio: BI, SQL, Python, Power BI, web dashboards, and cloud pipelines." />
  <meta name="color-scheme" content="light dark" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    :root{
      --bg: #ffffff;
      --fg: #0f172a;
      --muted: #475569;
      --link: #2563eb;
      --card: #f8fafc;
      --border: #e2e8f0;
    }
    @media (prefers-color-scheme: dark){
      :root{
        --bg:#0b1020; --fg:#e6eaf3; --muted:#9aa4b2; --link:#60a5fa; --card:#0f172a; --border:#1f2937;
      }
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0}
    body{
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
      background:var(--bg); color:var(--fg); line-height:1.6;
    }
    .wrap{max-width: 980px; margin: 0 auto; padding: 48px 20px 64px;}
    header h1{font-size: clamp(1.6rem, 2.5vw + 1rem, 2.4rem); margin: 0 0 8px; letter-spacing:.2px}
    header p{margin:0 0 16px; color:var(--muted)}
    .pill{
      display:inline-block; padding:6px 12px; border:1px solid var(--border); border-radius:999px;
      background: var(--card); color: var(--muted); font-size:.9rem;
    }
    hr{border:none; height:1px; background:var(--border); margin:28px 0}
    h2{font-size: clamp(1.2rem, 1.2vw + 1rem, 1.6rem); margin: 28px 0 12px}
    a{color:var(--link); text-decoration: none}
    a:hover{text-decoration: underline}
    .card{
      background:var(--card); border:1px solid var(--border); border-radius:16px; padding:18px 20px; margin:14px 0;
    }
    table{width:100%; border-collapse: collapse; background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden}
    th, td{padding:14px 16px; text-align:left; vertical-align: top}
    th{background: rgba(0,0,0,.03)}
    tr + tr td{border-top:1px solid var(--border)}
    code, .mono{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace}
    .grid{display:grid; gap:10px}
    .grid-2{grid-template-columns: 1fr}
    @media (min-width: 760px){ .grid-2{grid-template-columns: 1fr 1fr} }
    footer{margin-top:40px; color:var(--muted)}
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <h1>🧠 Ronen Lesnick – Data Portfolio</h1>
      <p>Welcome to my personal portfolio website, proudly hosted on GitHub Pages at
        <a href="https://ronenlasnick.github.io" target="_blank" rel="noopener">ronenlasnick.github.io</a>.
      </p>
      <span class="pill">📊 Data Analysis · 📈 BI · 🧮 SQL/Python/Power BI · 🌐 Web Dashboards · ☁️ Cloud Pipelines</span>
    </header>

    <hr />

    <section>
      <h2>🚀 Live Projects</h2>
      <table aria-label="Live projects">
        <thead>
          <tr>
            <th style="width: 30%">Project Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>In-Depth Consumer Analysis</strong></td>
            <td>Behavioral insights from a 57GB multi-category e-commerce dataset (REES46) using Power BI.</td>
          </tr>
          <tr>
            <td><strong>Plant Co. Financial Dashboard</strong></td>
            <td>Gross profit and financial trends visualization for a simulated business case.</td>
          </tr>
          <tr>
            <td><strong>ModelQuest: AI Model Training Trends</strong></td>
            <td>Analysis of model training hours, accessibility, and evolution across top AI companies.</td>
          </tr>
          <tr>
            <td><strong>Cyber Incident Insights Dashboard</strong></td>
            <td>End-to-end ETL pipeline (Airflow → S3 → Snowflake → Power BI) for cyber threat analytics.</td>
          </tr>
          <tr>
            <td><strong>US Macro Economic Insights</strong></td>
            <td>
              Full-stack data engineering pipeline built with Databricks, Delta Lake, and Power BI to transform FRED macroeconomic data into interactive dashboards.
              <a class="mono" href="https://github.com/ronenlasnick/Fred_Data_-Repo" target="_blank" rel="noopener">📄 GitHub</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>🛠️ Technologies Used</h2>
      <div class="grid grid-2">
        <div class="card">
          <strong>Languages:</strong> Python, SQL, HTML/CSS, JavaScript
        </div>
        <div class="card">
          <strong>Data &amp; Analytics:</strong> Power BI, Databricks, Apache Spark, Delta Lake
        </div>
        <div class="card">
          <strong>Cloud Services:</strong> AWS, Azure Blob Storage, Snowflake
        </div>
        <div class="card">
          <strong>Orchestration:</strong> Airflow, GitHub Actions
        </div>
        <div class="card">
          <strong>Web Hosting:</strong> GitHub Pages
        </div>
      </div>
    </section>

    <section>
      <h2>📬 Contact</h2>
      <p>Got questions or want to collaborate? Reach out via
        <a href="mailto:ronen@ha-makolet.co.il">ronen@ha-makolet.co.il</a>.
      </p>
    </section>

    <footer>
      <hr />
      <p>© <span id="y"></span> Ronen Lesnick</p>
    </footer>
  </main>

  <script>
    // Set year in footer
    document.getElementById('y').textContent = new Date().getFullYear();
  </script>
</body>
</html>
