import requests
import sys
from bs4 import BeautifulSoup
research_later=sys.argv[1]
for i in range(2,len(sys.argv)):
	research_later=research_later+"+"+sys.argv[i]
goog_search = "https://www.google.co.in/search?sclient=psy-ab&client=ubuntu&hs=k5b&channel=fs&biw=1366&bih=648&noj=1&q=" + research_later
r = requests.get(goog_search)
soup = BeautifulSoup(r.content, "html.parser")
a = soup.find_all('a',href=True)
for i in range(len(a)):	
	if "google" not in str(a[i]['href']):
		if "stackoverflow" in str(a[i]['href']):
			print a[i]['href']
			break