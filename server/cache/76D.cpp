#include <bits/stdc++.h>

using namespace std;

int main(){
	ios_base::sync_with_stdio(false);cin.tie(NULL);
	unsigned long long A,B,X,Y;
	cin>>A>>B;
	X=A^B;
	Y=A-X;
	cout<<X<<"\n"<<Y<<"\n";
	return 0;
}