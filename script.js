const MENU = {
  Pizzas: {
    hasSizes: true,
    items: [
      { name: "Marguerite", desc: "Sauce tomate, mozzarella, origan",prices: { Normale: 600, "Méga": 1200, "Géante": 1800 } },
      { name: "3 Fromages", desc: "Mozzarella, cheddar, emmental", prices: { Normale: 750, "Méga": 1400, "Géante": 2000 } },
      { name: "Thon", desc: "Thon, olives, oignons, sauce tomate", prices: { Normale: 700, "Méga": 1300, "Géante": 1900 } },
      { name: "Poulet", desc: "Poulet grillé, poivrons, mozzarella", prices: { Normale: 750, "Méga": 1400, "Géante": 2000 } },
      { name: "Végétarienne", desc: "Champignons, poivrons, olives, maïs", prices: { Normale: 650, "Méga": 1250, "Géante": 1850 } },
      { name: "Fruits de mer", desc: "Crevettes, calamars, sauce blanche", prices: { Normale: 850, "Méga": 1600, "Géante": 2300 } },
      { name: "Orientale", desc: "Merguez, poivrons, œuf, harissa", prices: { Normale: 800, "Méga": 1500, "Géante": 2100 } },
      { name: "4 Saisons", desc: "Jambon, champignons, olives, artichauts", prices: { Normale: 750, "Méga": 1400, "Géante": 2000 } },
    ]
  },
  Tacos: {
    items: [
      { name: "Tacos Poulet", desc: "Poulet mariné, frites, sauce fromagère", price: 450 },
      { name: "Tacos Viande Hachée", desc: "Viande hachée, frites, sauce fromagère", price: 500 },
      { name: "Tacos Kebab", desc: "Viande à la broche, frites, sauce blanche", price: 550 },
      { name: "Tacos Crispy", desc: "Poulet croustillant, frites, sauce algérienne", price: 550 },
      { name: "Tacos Mixte", desc: "Poulet + viande hachée, frites, sauce fromagère", price: 600 },
      { name: "Tacos Escalope", desc: "Escalope panée, frites, sauce fromagère", price: 600 },
    ]
  },
  Plats: {
    items: [
      { name: "Plat Poulet Grillé", desc: "Poulet grillé, riz ou frites, salade", price: 650 },
      { name: "Plat Kebab", desc: "Viande à la broche, frites, salade", price: 700 },
      { name: "Plat Escalope Panée", desc: "Escalope panée, frites, salade", price: 700 },
      { name: "Plat Brochettes", desc: "Brochettes de poulet grillées, frites", price: 750 },
      { name: "Plat Mixte", desc: "Poulet, viande, merguez, frites", price: 900 },
    ]
  },
  Sandwichs: {
    items: [
      { name: "Sandwich Kebab", desc: "Viande à la broche, crudités, sauce", price: 350 },
      { name: "Sandwich Poulet", desc: "Poulet grillé, crudités, sauce", price: 350 },
      { name: "Sandwich Thon", desc: "Thon, œuf, crudités, mayonnaise", price: 320 },
      { name: "Sandwich Merguez", desc: "Merguez grillées, crudités, harissa", price: 380 },
      { name: "Sandwich Escalope", desc: "Escalope panée, crudités, sauce fromagère", price: 400 },
    ]
  },
  Burgers: {
    items: [
      { name: "Burger Classic", desc: "Steak, cheddar, crudités, sauce burger", price: 450 },
      { name: "Burger Chicken", desc: "Poulet croustillant, crudités, sauce", price: 480 },
      { name: "Burger Double Cheese", desc: "Double steak, double cheddar", price: 650 },
      { name: "Burger Mega", desc: "Double steak, poulet, œuf, cheddar", price: 750 },
    ]
  },
  Boissons: {
    items: [
      { name: "Coca-Cola 33cl", desc: "Boisson gazeuse fraîche", price: 100 },
      { name: "Fanta 33cl", desc: "Boisson gazeuse fraîche", price: 100 },
      { name: "Eau Minérale 50cl", desc: "Eau plate", price: 60 },
      { name: "Jus d'Orange", desc: "Jus pressé du jour", price: 150 },
      { name: "Ice Tea", desc: "Thé glacé pêche ou citron", price: 120 },
    ]
  },
  Desserts: {
    items: [
      { name: "Tiramisu", desc: "Recette maison au café", price: 300 },
      { name: "Fondant au Chocolat", desc: "Coeur coulant chocolat noir", price: 320 },
      { name: "Cheesecake", desc: "Coulis de fruits rouges", price: 350 },
      { name: "Crêpe Nutella", desc: "Crêpe chaude au Nutella", price: 250 },
      { name: "Tarte aux Fruits", desc: "Fruits frais de saison", price: 300 },
    ]
  }
};

/* ---------- ETAT EN MEMOIRE ---------- */
const state = {
  users: [],          // { nom, prenom, telephone, localisation, password }
  currentUser: null,
  pendingMode: null,  // 'reservation' | 'commande'
  cart: [],           // { key, name, size, price, qty }
  activeCategory: "Pizzas",
};

/* ---------- UTILITAIRES ---------- */
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return document.querySelectorAll(sel); }

function showScreen(id){
  $all(".screen").forEach(s => s.classList.remove("active"));
  $("#" + id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function formatDA(n){ return n.toLocaleString("fr-FR") + " DA"; }

function updateHeader(){
  const actions = $("#headerActions");
  if(state.currentUser){
    actions.hidden = false;
    $("#userChip").textContent = "Bonjour " + state.currentUser.prenom;
  } else {
    actions.hidden = true;
  }
}

/* ---------- LOGO / MODAL INFOS ---------- */
$("#logoBtn").addEventListener("click", () => {
  $("#infoModalOverlay").classList.add("active");
});
$("#closeModal").addEventListener("click", () => {
  $("#infoModalOverlay").classList.remove("active");
});
$("#infoModalOverlay").addEventListener("click", (e) => {
  if(e.target.id === "infoModalOverlay") $("#infoModalOverlay").classList.remove("active");
});

/* ---------- RETOUR / ACCUEIL ---------- */
$all("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.back));
});
$("#homeBtn").addEventListener("click", () => showScreen("screen-welcome"));

/* ---------- CHOIX ACCUEIL ---------- */
$("#choiceReserver").addEventListener("click", () => {
  state.pendingMode = "reservation";
  if(state.currentUser){
    openReservation();
  } else {
    openAuth("Connectez-vous pour réserver votre table.");
  }
});

$("#choiceCommander").addEventListener("click", () => {
  state.pendingMode = "commande";
  if(state.currentUser){
    openMenu();
  } else {
    openAuth("Connectez-vous pour commander et être livré.");
  }
});

/* ---------- ECRAN AUTH ---------- */
function openAuth(hintText){
  $("#authHint").textContent = hintText;
  // Le champ localisation n'a de sens que pour la commande/livraison
  $("#locField").style.display = state.pendingMode === "commande" ? "flex" : "none";
  showScreen("screen-auth");
}

$all(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $all(".auth-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const isLogin = tab.dataset.tab === "login";
    $("#loginForm").classList.toggle("hidden", !isLogin);
    $("#registerForm").classList.toggle("hidden", isLogin);
    $("#authTitle").textContent = isLogin ? "Connexion" : "Créer un compte";
  });
});

$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = $("#loginPhone").value.trim();
  const pass = $("#loginPassword").value;
  const user = state.users.find(u => u.telephone === phone && u.password === pass);
  if(!user){
    alert("Numéro ou mot de passe incorrect. Créez un compte si vous êtes nouveau.");
    return;
  }
  state.currentUser = user;
  afterAuthSuccess();
});

$("#registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = $("#regNom").value.trim();
  const prenom = $("#regPrenom").value.trim();
  const localisation = $("#regLocalisation").value.trim();
  const telephone = $("#regTelephone").value.trim();
  const password = $("#regPassword").value;

  if(state.pendingMode === "commande" && !localisation){
    alert("Merci de préciser votre localisation pour la livraison.");
    return;
  }

  const user = { nom, prenom, telephone, localisation, password };
  state.users.push(user);
  state.currentUser = user;
  afterAuthSuccess();
});

function afterAuthSuccess(){
  updateHeader();
  if(state.pendingMode === "reservation"){
    openReservation();
  } else {
    openMenu();
  }
}

/* ---------- RESERVATION ---------- */
const heureSelect = $("#reservHeure");
for(let h = 11; h <= 22; h++){
  ["00", "30"].forEach(m => {
    const opt = document.createElement("option");
    opt.value = `${h}:${m}`;
    opt.textContent = `${h}h${m}`;
    heureSelect.appendChild(opt);
  });
}

function openReservation(){
  $("#reservUserName").textContent = state.currentUser.prenom;
  const today = new Date().toISOString().split("T")[0];
  $("#reservDate").min = today;
  if(!$("#reservDate").value) $("#reservDate").value = today;
  showScreen("screen-reservation");
}

$("#stepMinus").addEventListener("click", () => {
  const input = $("#reservPersonnes");
  input.value = Math.max(1, parseInt(input.value) - 1);
});
$("#stepPlus").addEventListener("click", () => {
  const input = $("#reservPersonnes");
  input.value = Math.min(20, parseInt(input.value) + 1);
});

$("#reservationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const date = $("#reservDate").value;
  const heure = $("#reservHeure").value;
  const personnes = $("#reservPersonnes").value;
  if(!heure){ alert("Merci de choisir une heure."); return; }

  const tableNum = Math.floor(Math.random() * 24) + 1;

  $("#confTable").textContent = "N°" + tableNum;
  $("#confNom").textContent = state.currentUser.prenom + " " + state.currentUser.nom;
  $("#confDate").textContent = new Date(date).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  $("#confHeure").textContent = heure;
  $("#confPersonnes").textContent = personnes;

  showScreen("screen-reservation-confirm");
});

/* ---------- MENU / COMMANDE ---------- */
function openMenu(){
  renderCategoryTabs();
  renderMenuGrid();
  showScreen("screen-menu");
}

function renderCategoryTabs(){
  const wrap = $("#categoryTabs");
  wrap.innerHTML = "";
  Object.keys(MENU).forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-tab" + (cat === state.activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      state.activeCategory = cat;
      renderCategoryTabs();
      renderMenuGrid();
    });
    wrap.appendChild(btn);
  });
}

function renderMenuGrid(){
  const grid = $("#menuGrid");
  grid.innerHTML = "";
  const category = MENU[state.activeCategory];

  category.items.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "menu-item";

    let sizeHtml = "";
    let priceDisplay = item.price ? formatDA(item.price) : "";
    let selectedSize = null;

    if(category.hasSizes){
      const sizes = Object.keys(item.prices);
      selectedSize = sizes[0];
      priceDisplay = formatDA(item.prices[selectedSize]);
      sizeHtml = `<div class="size-select">` + sizes.map((s, i) =>
        `<button type="button" class="size-opt${i === 0 ? " active" : ""}" data-size="${s}">${s}</button>`
      ).join("") + `</div>`;
    }

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="desc">${item.desc}</p>
      ${sizeHtml}
      <div class="item-footer">
        <span class="item-price">${priceDisplay}</span>
        <button class="add-btn">Ajouter</button>
      </div>
    `;

    if(category.hasSizes){
      card.querySelectorAll(".size-opt").forEach(opt => {
        opt.addEventListener("click", () => {
          card.querySelectorAll(".size-opt").forEach(o => o.classList.remove("active"));
          opt.classList.add("active");
          selectedSize = opt.dataset.size;
          card.querySelector(".item-price").textContent = formatDA(item.prices[selectedSize]);
        });
      });
    }

    card.querySelector(".add-btn").addEventListener("click", () => {
      const price = category.hasSizes ? item.prices[selectedSize] : item.price;
      const label = category.hasSizes ? `${item.name} (${selectedSize})` : item.name;
      addToCart(label, price);
    });

    grid.appendChild(card);
  });
}

function addToCart(label, price){
  const existing = state.cart.find(l => l.label === label);
  if(existing){
    existing.qty += 1;
  } else {
    state.cart.push({ label, price, qty: 1 });
  }
  renderCart();
  openCart();
}

function renderCart(){
  const wrap = $("#cartItems");
  wrap.innerHTML = "";

  if(state.cart.length === 0){
    wrap.innerHTML = `<p class="cart-empty">Votre panier est vide.</p>`;
  } else {
    state.cart.forEach((line, idx) => {
      const div = document.createElement("div");
      div.className = "cart-line";
      div.innerHTML = `
        <span>${line.qty} × ${line.label}</span>
        <span>${formatDA(line.price * line.qty)}</span>
        <button class="cart-line-remove" data-idx="${idx}">&times;</button>
      `;
      wrap.appendChild(div);
    });
    wrap.querySelectorAll(".cart-line-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        state.cart.splice(parseInt(btn.dataset.idx), 1);
        renderCart();
      });
    });
  }

  const total = state.cart.reduce((sum, l) => sum + l.price * l.qty, 0);
  $("#cartTotal").textContent = formatDA(total);
  $("#cartCount").textContent = state.cart.reduce((sum, l) => sum + l.qty, 0);
}

function openCart(){
  $("#cartPanel").classList.add("open");
  $("#cartOverlay").classList.add("active");
}
function closeCart(){
  $("#cartPanel").classList.remove("open");
  $("#cartOverlay").classList.remove("active");
}
$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartOverlay").addEventListener("click", closeCart);

$("#checkoutBtn").addEventListener("click", () => {
  if(state.cart.length === 0){
    alert("Ajoutez au moins un article avant de commander.");
    return;
  }
  const total = state.cart.reduce((sum, l) => sum + l.price * l.qty, 0);
  const orderNum = "DLC-" + Math.floor(1000 + Math.random() * 9000);

  $("#orderNum").textContent = orderNum;
  $("#orderNom").textContent = state.currentUser.prenom + " " + state.currentUser.nom;
  $("#orderAdresse").textContent = state.currentUser.localisation || "-";
  $("#orderTotal").textContent = formatDA(total);

  state.cart = [];
  renderCart();
  closeCart();
  showScreen("screen-order-confirm");
});

/* ---------- INIT ---------- */
$("#year").textContent = new Date().getFullYear();
