import os
import requests
from bs4 import BeautifulSoup
import urllib.request

APPS = {
    'logiccraft': 'https://play.google.com/store/apps/details?id=com.behonorstudio.logiccraft',
    'flickwand': 'https://play.google.com/store/apps/details?id=com.behonorstudio.flickstartx',
    'isstracker': 'https://play.google.com/store/apps/details?id=com.behonor.iss_tracker',
}

OUTPUT_DIR = 'public/images/apps'
os.makedirs(OUTPUT_DIR, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for name, url in APPS.items():
    try:
        print(f"Fetching {name}...")
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # In Google Play, the icon is usually an img tag inside a c-wiz with an alt tag "Icon image" or similar.
        # Alternatively, we can find the high-res icon and banner in the DOM.
        # Usually, first img with alt that contains "Icon image" is the icon. Let's look for meta tags or specific classes.
        
        # Find icon: Google Play uses something like: src="https://play-lh.googleusercontent.com/..." for icons.
        # Let's try finding the image with alt="Icon image"
        icon_img = soup.find('img', alt='Icon image')
        if icon_img and icon_img.get('src'):
            icon_url = icon_img['src']
            if icon_url.startswith('//'):
                icon_url = 'https:' + icon_url
            # Remove sizing parameters to get high-res if possible
            icon_url = icon_url.split('=')[0] + '=w512'
            print(f"Found icon for {name}: {icon_url}")
            urllib.request.urlretrieve(icon_url, os.path.join(OUTPUT_DIR, f"{name}_icon.webp"))
        
        # Banner is typically found in trailer or screenshot areas, or we might need to search for it.
        # Trailer cover image often has "alt='Trailer'" or similar.
        banner_img = soup.find('img', alt='Trailer cover') or soup.find('img', alt='Trailer')
        if not banner_img:
            # Maybe the first screenshot?
            banner_img = soup.find('img', alt='Screenshot image')
        
        # Another reliable way is meta tags if it's og:image (usually the icon though)
        if banner_img and banner_img.get('src'):
            banner_url = banner_img['src']
            if banner_url.startswith('//'):
                banner_url = 'https:' + banner_url
            banner_url = banner_url.split('=')[0] + '=w1024'
            print(f"Found banner/screenshot for {name}: {banner_url}")
            urllib.request.urlretrieve(banner_url, os.path.join(OUTPUT_DIR, f"{name}_banner.webp"))
            
    except Exception as e:
        print(f"Failed for {name}: {e}")

print("Done!")
