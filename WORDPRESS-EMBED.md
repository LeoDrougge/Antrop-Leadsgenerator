# Bädda in AI Hero-blocket i WordPress

## Snabbguide för redaktörer

### Steg 1: Öppna sidan i WordPress
1. Logga in i WordPress Admin
2. Gå till den sida där du vill lägga till AI-blocket
3. Klicka på **Redigera** (eller skapa en ny sida)

### Steg 2: Lägg till Custom HTML-block
1. Klicka på **+** (Lägg till block)
2. Sök efter **"Custom HTML"** eller **"Anpassad HTML"**
3. Välj blocket

### Steg 3: Klistra in följande kod

```html
<div style="width: 100%; margin: 0 auto;">
  <iframe
    src="https://antrop-leadsgenerator-4syq.vercel.app/"
    id="antrop-ai-hero"
    style="width: 100%; min-height: 800px; border: none; display: block;"
    title="Antrop AI Assistant"
    loading="lazy"
  ></iframe>
</div>

<script>
// Auto-resize iframe baserat på innehåll
window.addEventListener('message', function(event) {
  if (event.origin === 'https://antrop-leadsgenerator-4syq.vercel.app') {
    var iframe = document.getElementById('antrop-ai-hero');
    if (iframe && event.data.height) {
      iframe.style.height = event.data.height + 'px';
    }
  }
});
</script>
```

### Steg 4: Publicera
1. Klicka på **Uppdatera** eller **Publicera**
2. Besök sidan för att se resultatet

---

## Alternativ: Använd Shortcode (om tema stödjer)

Om ditt WordPress-tema/plugin stödjer shortcodes kan du skapa en återanvändbar shortcode.

### Lägg till i `functions.php`:
```php
function antrop_ai_hero_shortcode() {
    ob_start();
    ?>
    <div style="width: 100%; margin: 0 auto;">
      <iframe
        src="https://antrop-leadsgenerator-4syq.vercel.app/"
        id="antrop-ai-hero"
        style="width: 100%; min-height: 800px; border: none; display: block;"
        title="Antrop AI Assistant"
        loading="lazy"
      ></iframe>
    </div>

    <script>
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://antrop-leadsgenerator-4syq.vercel.app') {
        var iframe = document.getElementById('antrop-ai-hero');
        if (iframe && event.data.height) {
          iframe.style.height = event.data.height + 'px';
        }
      }
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('antrop_ai', 'antrop_ai_hero_shortcode');
```

### Använd shortcode på vilken sida som helst:
```
[antrop_ai]
```

---

## Responsivitet

Blocket är **helt responsivt** och anpassar sig automatiskt till:
- 📱 Mobil (iPhone, Android)
- 📱 Surfplatta (iPad)
- 💻 Desktop

Ingen ytterligare CSS behövs.

---

## Felsökning

### Problem: "Blocket visas inte"
**Lösning:** Kontrollera att din WordPress-sida tillåter iframes. Vissa säkerhetsplugins blockerar iframes.

### Problem: "Scrollbar syns dubbelt"
**Lösning:** Lägg till `overflow: hidden;` på parent-elementet:
```html
<div style="width: 100%; margin: 0 auto; overflow: hidden;">
```

### Problem: "Höjden är fel"
**Lösning:** JavaScript-delen hanterar auto-resize. Om det inte fungerar, öka `min-height` till `1000px` eller mer.

---

## Support

Vid tekniska problem, kontakta utvecklingsteamet.
