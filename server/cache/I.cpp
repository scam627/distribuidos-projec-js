#include <bits/stdc++.h>

using namespace std;

int main(){
	int n;
	cin>>n;
	while(n--){
		int t;
		cin>>t;
		vector<int> gnomes;
		vector<int> gnomes_state;
		int l;
		while(t--){
			cin>>l;
			gnomes.push_back(l);
		}
		gnomes_state.push_back(1);
		for(int i=1;i<gnomes.size();i++){
			if(gnomes[i]-1==gnomes[i-1]){
				gnomes_state.push_back(1);
			}else{
				gnomes_state.push_back(2);
			}
		}
		for(int j=0;j<gnomes_state.size();j++){
			if(gnomes_state[j]==2){
				if(j==gnomes_state.size()-1){
					cout<<j+1<<"\n";
				}else if(gnomes_state[j+1]==2){
					cout<<j+1<<"\n";
				}else{
					cout<<j<<"\n";
				}
				break;
			}
		}
	}	
	return 0;
}