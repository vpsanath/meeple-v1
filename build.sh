#!/bin/bash
# build.sh — assembles index.html from HTML partials
# Usage: bash build.sh   (from the project root)

SCREENS_DIR="$(dirname "$0")/screens"
OUT="$(dirname "$0")/index.html"

cat > "$OUT" << 'HEADER'
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meeplit | Organise tes soirées jeux</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <div class="app-container">
HEADER

# Inject screens
cat "$SCREENS_DIR/onboarding.html" >> "$OUT"
cat "$SCREENS_DIR/home.html" >> "$OUT"
cat "$SCREENS_DIR/library.html" >> "$OUT"

# Inject nav
cat "$SCREENS_DIR/nav.html" >> "$OUT"

cat >> "$OUT" << 'END_APP_CONTAINER'
    </div>
END_APP_CONTAINER

# Inject modals (outside app-container)
cat "$SCREENS_DIR/modals.html" >> "$OUT"

cat >> "$OUT" << 'FOOTER'

    <script src="app.js"></script>
</body>

</html>
FOOTER

echo "✅ index.html assembled from partials"
