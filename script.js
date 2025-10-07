// ===== Load Local Projects =====
fetch("projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("project-list");
    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p><strong>Tools:</strong> ${p.tools.join(", ")}</p>
        ${p.video ? `<a href="${p.video}" target="_blank">🎥 Watch Video</a>` : ""}
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading projects:", err));


// ===== Load YouTube Videos =====
// Replace with your own Channel ID and API key:
const channelId = "UC-te4kY8p4mOn08tbQ5VRvA";
const apiKey = "AIzaSyAVdhwrwzQYXsxLxSguknE0_Jxh_LEzJuc";
const maxResults = 5; // Number of videos to show

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`)
  .then(res => res.json())
  .then(data => {
    const videoContainer = document.getElementById("video-list");
    data.items.forEach(item => {
      if (item.id.kind === "youtube#video") {
        const videoId = item.id.videoId;
        const videoCard = document.createElement("div");
        videoCard.className = "project-card";
        videoCard.innerHTML = `
          <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}" style="width:100%; border-radius:6px;">
          <h3>${item.snippet.title}</h3>
          <p>${item.snippet.description.substring(0, 120)}...</p>
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">▶ Watch on YouTube</a>
        `;
        videoContainer.appendChild(videoCard);
      }
    });
  })
  .catch(err => console.error("Error loading YouTube videos:", err));
