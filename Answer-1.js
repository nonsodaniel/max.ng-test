
/*initialize global variable */
let output = {}; //stored final output
let regStudents = []; //stored regNo of already assigned student
let count = 0; //sored numbers of groups

function processFile(fileArr){

	//exit recurring function
	if(fileArr.length == 0){
		output.noOfGroups = count; //set total groups
		return output
    }

	let newgrp = [];
	fileArr.forEach(({ name, regNo, dob} /*each student*/)=> {
		//get student age
		const age = new Date().getFullYear() - new Date(dob).getFullYear();
		
		/*check if new group is empty and push first member */
		if(newgrp.length == 0){
			newgrp.push({regNo,name,age}); //insert first member
			regStudents.push(regNo);
		}
		/*check if group has reach traffic limit i.e max(3) */
		else if(newgrp.length > 0 && newgrp.length < 3){
			let acceptAge = false;
			newgrp.forEach((st) => {
				//check if student can join newgrp using age as constraint
				const ageDiff = st.age - age;
				if(ageDiff <= 5 && ageDiff >= -5) acceptAge = true; //-5,-4,-3,-2,-1,0,1,2,3,4,5
			});
			if(acceptAge) {
				newgrp.push({regNo,name,age}) //insert another member
				regStudents.push(regNo);
			}
		}
	});

	count += 1; 

	//create grp obj
	output[`group${count}`] = {
        members: ((group)=>{
				//The groups: with the names and age of its members.
				let result = group.map((sobj)=>{
					const {name, age} = sobj;
					return { name, age};
				});
				return result;
			})(newgrp),
            oldest: ((group)=>{
				//The age of the oldest member in each group.
				let oldest = 0;
				for(s of group){
					if(s.age > oldest) oldest = s.age;
				}
				return oldest;
			})(newgrp),
        sum: ((group)=>{
				//The sum of ages of students in each group.
				let sum = 0;
				for(s of group){
					sum += s.age;
				}
				return sum
			})(newgrp),
        regNos: ((group)=>{
				//The regNo of students in each group in ascending order.
				let result = group.map((sobj)=>{
					const {regNo } = sobj;
					return parseInt(regNo);
				});
				return result.sort();
			})(newgrp)
        }


	return processFile(
      //cancel out already assigned students from file and invoke function again
      fileArr.filter((member) => regStudents.indexOf(member.regNo) == -1)
		)	
}

