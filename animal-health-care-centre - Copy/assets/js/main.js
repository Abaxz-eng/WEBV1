(function () {
  "use strict";

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  var scrollTopButton = document.querySelector(".scroll-top");
  var revealItems = document.querySelectorAll(".reveal");
  var nextFrame = window.requestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 16);
  };
  var on = function (element, eventName, handler, options) {
    if (!element) {
      return;
    }

    if (element.addEventListener) {
      element.addEventListener(eventName, handler, options || false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, handler);
    }
  };
  var hasClass = function (element, className) {
    return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
  };
  var addClass = function (element, className) {
    if (!hasClass(element, className)) {
      element.className = element.className ? element.className + " " + className : className;
    }
  };
  var removeClass = function (element, className) {
    element.className = (" " + element.className + " ").replace(" " + className + " ", " ").replace(/^\s+|\s+$/g, "");
  };
  var toggleClass = function (element, className, force) {
    if (force) {
      addClass(element, className);
      return true;
    }
    removeClass(element, className);
    return false;
  };

  var replaceLegacyCompanyName = function (node) {
    var childNodes = node.childNodes;
    for (var childIndex = 0; childIndex < childNodes.length; childIndex += 1) {
      var child = childNodes[childIndex];
      if (child.nodeType === 3) {
        child.nodeValue = child.nodeValue.replace(/Prime Animal Healthcare Consultancy Limited/g, "Animal Health Care Centre Ltd");
      } else if (child.nodeType === 1 && child.tagName !== "SCRIPT" && child.tagName !== "STYLE") {
        replaceLegacyCompanyName(child);
      }
    }
  };

  replaceLegacyCompanyName(document.body);

  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (currentPage === "") currentPage = "index.html";
  if (currentPage !== "index.html" && document.querySelector(".site-nav") && !document.querySelector('.site-nav > a[data-home-link]')) {
    var mainMenuHome = document.createElement("a");
    mainMenuHome.href = "index.html";
    mainMenuHome.textContent = "Home";
    mainMenuHome.setAttribute("data-home-link", "true");
    document.querySelector(".site-nav").insertBefore(mainMenuHome, document.querySelector(".site-nav").firstChild);
  }

  var brandedSocials = [
    { key: "whatsapp", match: "wa.me", color: "25d366", label: "WhatsApp" },
    { key: "telegram", match: "t.me", color: "229ed9", label: "Telegram" },
    { key: "youtube", match: "youtube.com", color: "ff0000", label: "YouTube" },
    { key: "instagram", match: "instagram.com", color: "e4405f", label: "Instagram" },
    { key: "facebook", match: "facebook.com", color: "1877f2", label: "Facebook" },
    { key: "tiktok", match: "tiktok.com", color: "111111", label: "TikTok" }
  ];
  var allSocialAnchors = document.querySelectorAll("a[href]");
  for (var anchorIndex = 0; anchorIndex < allSocialAnchors.length; anchorIndex += 1) {
    var anchor = allSocialAnchors[anchorIndex];
    var anchorHref = anchor.href.toLowerCase();
    for (var brandIndex = 0; brandIndex < brandedSocials.length; brandIndex += 1) {
      var brand = brandedSocials[brandIndex];
      if (anchorHref.indexOf(brand.match) > -1) {
        addClass(anchor, "social-brand social-" + brand.key);
        anchor.setAttribute("aria-label", brand.label);
        var brandIcon = anchor.querySelector("img");
        if (brandIcon) brandIcon.src = "https://cdn.simpleicons.org/" + brand.key + "/" + brand.color;
        break;
      }
    }
  }

  var socialLinks = document.querySelectorAll(".socials a");
  for (var socialIndex = 0; socialIndex < socialLinks.length; socialIndex += 1) {
    var socialLink = socialLinks[socialIndex];
    var socialHref = socialLink.href;
    var socialName = socialHref.indexOf("t.me") > -1 ? "Telegram" : socialHref.indexOf("youtube") > -1 ? "YouTube" : socialHref.indexOf("wa.me") > -1 ? "WhatsApp" : socialHref.indexOf("facebook") > -1 ? "Facebook" : socialHref.indexOf("instagram") > -1 ? "Instagram" : "Social media";
    var socialIcon = document.createElement("img");
    socialIcon.src = "https://cdn.simpleicons.org/" + socialName.toLowerCase() + "/FFFFFF";
    socialIcon.alt = "";
    socialLink.setAttribute("aria-label", socialName);
    socialLink.textContent = "";
    socialLink.appendChild(socialIcon);
  }

  var socialGroups = document.querySelectorAll(".socials");
  for (var groupIndex = 0; groupIndex < socialGroups.length; groupIndex += 1) {
    if (!socialGroups[groupIndex].querySelector('a[href*="instagram.com"]')) {
      var instagramLink = document.createElement("a");
      instagramLink.href = "https://www.instagram.com/animalhealthcarecentre?igsh=M2UwMnNtc3Q4ZmJj&utm_source=qr";
      instagramLink.target = "_blank";
      instagramLink.rel = "noopener";
      instagramLink.setAttribute("aria-label", "Instagram");
      addClass(instagramLink, "social-brand social-instagram");
      var instagramIcon = document.createElement("img");
      instagramIcon.src = "https://cdn.simpleicons.org/instagram/FFFFFF";
      instagramIcon.alt = "";
      instagramLink.appendChild(instagramIcon);
      socialGroups[groupIndex].appendChild(instagramLink);
    }
    if (!socialGroups[groupIndex].querySelector('a[href*="tiktok.com"]')) {
      var tiktokLink = document.createElement("a");
      tiktokLink.href = "https://www.tiktok.com/@animalhealthcarecentre?_r=1&_t=ZS-94lQZTzgqEq";
      tiktokLink.target = "_blank";
      tiktokLink.rel = "noopener";
      tiktokLink.setAttribute("aria-label", "TikTok");
      addClass(tiktokLink, "social-brand social-tiktok");
      var tiktokIcon = document.createElement("img");
      tiktokIcon.src = "https://cdn.simpleicons.org/tiktok/FFFFFF";
      tiktokIcon.alt = "";
      tiktokLink.appendChild(tiktokIcon);
      socialGroups[groupIndex].appendChild(tiktokLink);
    }
  }

  var consultationSection = document.querySelector(".enquiries");
  if (consultationSection && !document.querySelector(".locations-section")) {
    consultationSection.insertAdjacentHTML("beforebegin", '<section class="section locations-section"><div class="section-heading reveal"><p class="eyebrow">Branch offices</p><h2>Find and connect with AHC.</h2><p>Visit our head office or contact the team for directions to our other outlets in Benin City.</p></div><div class="location-grid"><article class="location-card reveal"><h3>Head Office</h3><p>234-236 Murtala Muhammed Way,<br>Opposite Sapele Road Park,<br>By Third Junction, Benin City, Edo State.</p><p><strong>Tel:</strong> <a href="tel:+2348063463411">08063463411</a>, <a href="tel:+2348055594599">08055594599</a></p><a class="location-link" href="https://www.google.com/maps/search/?api=1&query=234-236%20Murtala%20Muhammed%20Way%2C%20Opposite%20Sapele%20Road%20Park%2C%20By%20Third%20Junction%2C%20Benin%20City%2C%20Edo%20State" target="_blank" rel="noopener">Get Directions</a></article><article class="location-card reveal"><h3>Benin City Outlets</h3><p>Several AHC outlets support farmers and animal owners across Benin City.</p><p><strong>Connect:</strong> Our team can guide you to the nearest outlet.</p><a class="location-link" href="contact.html#consultation">Contact the team</a></article><article class="location-card reveal"><h3>Customer Support</h3><p>For product availability, veterinary services, training, and farm consultancy.</p><p><strong>Email:</strong> animalhealthcare01@gmail.com</p><a class="location-link" href="https://wa.me/message/UKVVSHO756XGP1" target="_blank" rel="noopener">Message on WhatsApp</a></article></div></section>');
  }

  if (menuButton && nav) {
    var menuBackdrop = document.createElement("button");
    menuBackdrop.type = "button";
    menuBackdrop.className = "menu-backdrop";
    menuBackdrop.setAttribute("aria-label", "Close menu");
    menuBackdrop.setAttribute("tabindex", "-1");
    document.body.appendChild(menuBackdrop);

    var closeMobileMenu = function () {
      removeClass(nav, "open");
      removeClass(menuBackdrop, "visible");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    };

    on(menuButton, "click", function () {
      var isOpen = toggleClass(nav, "open", !hasClass(nav, "open"));
      toggleClass(menuBackdrop, "visible", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    on(menuBackdrop, "click", closeMobileMenu);

    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i += 1) {
      on(navLinks[i], "click", function () {
        closeMobileMenu();
      });
    }

    on(document, "keydown", function (event) {
      if (event.key === "Escape") closeMobileMenu();
    });

    on(window, "resize", function () {
      if (window.innerWidth > 820) closeMobileMenu();
    });
  }

  var dropdownButtons;
  if (nav && !nav.querySelector('a[href="news.html"]')) {
    var newsLink = document.createElement("a");
    newsLink.href = "news.html";
    newsLink.textContent = "News";
    nav.insertBefore(newsLink, nav.querySelector(".nav-cta"));
  }

  var legacyLeadershipLinks = document.querySelectorAll('.nav-dropdown-menu a[href="about.html#leadership"]');
  for (var legacyIndex = 0; legacyIndex < legacyLeadershipLinks.length; legacyIndex += 1) {
    var legacyLink = legacyLeadershipLinks[legacyIndex];
    legacyLink.textContent = "Our team";
    legacyLink.href = "about.html#team";
    var presidentLink = document.createElement("a");
    presidentLink.href = "about.html#president";
    presidentLink.textContent = "The president";
    legacyLink.parentNode.insertBefore(presidentLink, legacyLink.nextSibling);
  }

  var companyDropdowns = document.querySelectorAll(".nav-dropdown");
  for (var companyIndex = 0; companyIndex < companyDropdowns.length; companyIndex += 1) {
    var companyButton = companyDropdowns[companyIndex].querySelector(".nav-dropdown-toggle");
    var companyMenu = companyDropdowns[companyIndex].querySelector(".nav-dropdown-menu");
    if (companyButton && companyButton.textContent.trim() === "Company" && companyMenu && !companyMenu.querySelector('a[href="goals.html"]')) {
      var goalsLink = document.createElement("a");
      goalsLink.href = "goals.html";
      goalsLink.textContent = "Our goals";
      companyMenu.insertBefore(goalsLink, companyMenu.firstChild.nextSibling);
    }
  }

  if (nav && !nav.querySelector('.nav-dropdown-toggle[data-section="Training"]')) {
    var trainingDropdown = document.createElement("div");
    trainingDropdown.className = "nav-dropdown";
    trainingDropdown.innerHTML = '<button class="nav-dropdown-toggle" type="button" aria-expanded="false" data-section="Training">Training</button><div class="nav-dropdown-menu"><a href="index.html#courses">Training courses</a><a href="index.html#register">Register for training</a></div>';
    var contactNavLink = nav.querySelector('a[href="contact.html"]');
    nav.insertBefore(trainingDropdown, contactNavLink || null);
  }

  dropdownButtons = document.querySelectorAll(".nav-dropdown-toggle");
  for (var dropdownIndex = 0; dropdownIndex < dropdownButtons.length; dropdownIndex += 1) {
    (function (button) {
      on(button, "click", function () {
        var dropdown = this.parentNode;
        var isOpen = hasClass(dropdown, "open");
        var allDropdowns = document.querySelectorAll(".nav-dropdown");
        for (var closeIndex = 0; closeIndex < allDropdowns.length; closeIndex += 1) {
          removeClass(allDropdowns[closeIndex], "open");
          var otherButton = allDropdowns[closeIndex].querySelector(".nav-dropdown-toggle");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        }
        if (!isOpen) {
          addClass(dropdown, "open");
          this.setAttribute("aria-expanded", "true");
        }
      });
    }(dropdownButtons[dropdownIndex]));
  }

  var mobileBackTargets = document.querySelectorAll(".nav-dropdown-menu");
  for (var backIndex = 0; backIndex < mobileBackTargets.length; backIndex += 1) {
    (function (menu) {
      on(menu, "click", function (event) {
        if (!hasClass(event.target, "mobile-nav-back")) return;
        event.preventDefault();
        var parentDropdown = menu.parentNode;
        removeClass(parentDropdown, "open");
        var parentButton = parentDropdown.querySelector(".nav-dropdown-toggle");
        if (parentButton) parentButton.setAttribute("aria-expanded", "false");
      });
    }(mobileBackTargets[backIndex]));
  }

  var currentNavBackLinks = document.querySelectorAll(".nav-dropdown-menu");
  for (var currentBackIndex = 0; currentBackIndex < currentNavBackLinks.length; currentBackIndex += 1) {
    if (!currentNavBackLinks[currentBackIndex].querySelector(".mobile-nav-back")) {
      var currentBack = document.createElement("a");
      currentBack.href = "#menu";
      currentBack.className = "mobile-nav-back";
      currentBack.textContent = "Home";
      currentNavBackLinks[currentBackIndex].insertBefore(currentBack, currentNavBackLinks[currentBackIndex].firstChild);
    }
  }
  var historyPanel = document.querySelector(".history-section");
  if (historyPanel) {
    historyPanel.id = "history";
    if (window.location.hash === "#history") {

      window.setTimeout(function () {
        historyPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i += 1) {
        if (entries[i].isIntersecting) {
          addClass(entries[i].target, "visible");
          revealObserver.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.16 });

    for (var j = 0; j < revealItems.length; j += 1) {
      revealObserver.observe(revealItems[j]);
    }
  } else {
    for (var k = 0; k < revealItems.length; k += 1) {
      addClass(revealItems[k], "visible");
    }
  }

  if (scrollTopButton) {
    var scrollTicking = false;
    var getScrollY = function () {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    };
    var updateScrollTopButton = function () {
      toggleClass(scrollTopButton, "visible", getScrollY() > 600);
      scrollTicking = false;
    };

    on(window, "scroll", function () {
      if (!scrollTicking) {
        nextFrame(updateScrollTopButton);
        scrollTicking = true;
      }
    }, { passive: true });

    on(scrollTopButton, "click", function () {
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  var shopSearch = document.querySelector("[data-shop-search]");
  var shopCategory = document.querySelector("[data-shop-category]");
  var shopProducts = document.querySelectorAll("[data-shop-product]");
  var filterShop = function () {
    var query = shopSearch ? shopSearch.value.toLowerCase() : "";
    var category = shopCategory ? shopCategory.value : "all";
    for (var productIndex = 0; productIndex < shopProducts.length; productIndex += 1) {
      var product = shopProducts[productIndex];
      var matchesText = product.textContent.toLowerCase().indexOf(query) > -1;
      var matchesCategory = category === "all" || product.getAttribute("data-shop-category-value") === category;
      product.style.display = matchesText && matchesCategory ? "" : "none";
    }
  };

  on(shopSearch, "input", filterShop);
  on(shopCategory, "change", filterShop);

  var whatsappNumber = "2348063463411";
  var openWhatsApp = function (message) {
    var url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  var whatsappLinks = document.querySelectorAll('a[href*="wa.me/"]');
  for (var whatsappLinkIndex = 0; whatsappLinkIndex < whatsappLinks.length; whatsappLinkIndex += 1) {
    (function (link) {
      on(link, "click", function (event) {
        var productCard = link.closest ? link.closest("[data-shop-product]") : null;
        var productName = productCard ? productCard.querySelector("h3").textContent.trim() : "";
        var serviceCard = link.closest ? link.closest(".service-card") : null;
        var serviceName = serviceCard ? serviceCard.querySelector("h3").textContent.trim() : "";
        var actionText = link.textContent.trim();
        var message;

        if (productName) {
          message = "Hello Animal Health Care Centre, I would like to " + (actionText.toLowerCase().indexOf("order") > -1 ? "order" : "enquire about") + " " + productName + ". Please share current availability and price.";
        } else if (serviceName) {
          message = "Hello Animal Health Care Centre, I am interested in " + serviceName + ". Please let me know the next steps.";
        } else if (actionText.toLowerCase().indexOf("order") > -1) {
          message = "Hello Animal Health Care Centre, I would like to place an order. Please let me know current availability and prices.";
        } else {
          message = "Hello Animal Health Care Centre, I would like to chat with your team.";
        }

        if (event.preventDefault) event.preventDefault();
        openWhatsApp(message);
      });
    }(whatsappLinks[whatsappLinkIndex]));
  }

  var forms = document.querySelectorAll("form");

  for (var formIndex = 0; formIndex < forms.length; formIndex += 1) {
    on(forms[formIndex], "submit", function (event) {
      event = event || window.event;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }

      var target = event.target || event.srcElement;
      if (target.getAttribute("data-complaint-form") !== null) {
        var complaintFields = new FormData(target);
        var complaintMessage = [
          "Hello Animal Health Care Centre, I would like to submit a complaint.",
          "Name: " + complaintFields.get("name"),
          "Phone: " + complaintFields.get("phone"),
          "Email: " + (complaintFields.get("email") || "Not provided"),
          "Complaint type: " + complaintFields.get("type"),
          "Date of issue: " + (complaintFields.get("date") || "Not provided"),
          "Product or service: " + (complaintFields.get("subject") || "Not provided"),
          "Details: " + complaintFields.get("details")
        ].join("\n");
        openWhatsApp(complaintMessage);
        return;
      }

      var fields = [];
      var elements = target.elements;

      for (var i = 0; i < elements.length; i += 1) {
        var field = elements[i];
        if (!field.name || field.type === "submit" || field.type === "button") {
          continue;
        }

        if ((field.type === "checkbox" || field.type === "radio") && !field.checked) {
          continue;
        }

        if (field.value) {
          var fieldLabel = field.name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ");
          fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1);
          fields.push(fieldLabel + ": " + field.value);
        }
      }

      var isRegistration = target.querySelector('select[name="course"]');
      var isConsultation = target.querySelector('select[name="service"]');
      var greeting = isRegistration
        ? "Hello Animal Health Care Centre, I would like to register for training."
        : isConsultation
          ? "Hello Animal Health Care Centre, I would like to request a consultation."
          : "Hello Animal Health Care Centre, I would like to make an enquiry.";
      var message = fields.length ? greeting + "\n\n" + fields.join("\n") : greeting;

      openWhatsApp(message);
    });
  }
}());
