#!/bin/bash

RENAME_MAP="image-renames.json"

for OLD in $(jq -r 'keys[]' $RENAME_MAP); do
  NEW=$(jq -r --arg old "$OLD" '.[$old]' $RENAME_MAP)

  OLD_PATH="public/$OLD"
  NEW_PATH="public/$NEW"

  if [ -f "$OLD_PATH" ]; then
    echo "Renaming: $OLD → $NEW"
    git mv "$OLD_PATH" "$NEW_PATH"
  else
    echo "❌ File not found: $OLD_PATH"
  fi
done

echo "✅ Done. Now run: git commit -m 'Rename artist images' && git push"